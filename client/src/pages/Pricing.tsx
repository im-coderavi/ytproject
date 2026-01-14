import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import type { IUser } from '../assets/assets';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Pricing() {
    const { user, setUser } = useAuth();

    const plans = [
        {
            name: 'Free',
            price: '₹0',
            description: 'Perfect for getting started',
            features: ['5 Thumbnails Generation', 'Basic Styles', 'Standard Support', '720p Download'],
            tier: 'Free',
            limit: 5,
        },
        {
            name: 'Premium',
            price: '₹199',
            description: 'For growing creators',
            features: ['100 Thumbnails Generation', 'All Styles Unlocked', 'Priority Support', '1080p Download', 'Commercial Use'],
            tier: 'Premium',
            popular: true,
            limit: 100,
        },
        {
            name: 'Premium Pro',
            price: '₹499',
            description: 'For professional agencies',
            features: ['Unlimited Generation', 'Custom Branding', 'Personal Support', '4K Download', 'API Access'],
            tier: 'Premium Pro',
            limit: Infinity,
        },
    ];

    const handleUpgrade = async (tier: string) => {
        try {
            const { data } = await axios.post(
                import.meta.env.VITE_BASE_URL + '/subscription/upgrade',
                { tier },
                { withCredentials: true }
            );
            toast.success(data.message);
            if (user) {
                setUser({ ...user, subscriptionTier: tier as IUser['subscriptionTier'] });
            }
        } catch (error: any) {
            console.error('Free upgrade error', error);
            toast.error(error.response?.data?.message || 'Upgrade failed');
        }
    };

    // PayPal Config
    const initialOptions = {
        "clientId": "test", // Replace with env variable in real app
        currency: "INR",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className='min-h-screen pt-32 pb-20 px-6'>
                <div className='text-center max-w-3xl mx-auto mb-16'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent'>
                        Simple, Transparent Pricing
                    </h1>
                    <p className='text-gray-400 text-lg'>Choose the perfect plan for your creative needs. Upgrade anytime.</p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto'>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-2xl p-8 border ${plan.popular ? 'border-pink-500 bg-pink-900/10' : 'border-white/10 bg-white/5'
                                } backdrop-blur-sm flex flex-col`}
                        >
                            {plan.popular && (
                                <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium'>
                                    Most Popular
                                </div>
                            )}
                            <h3 className='text-2xl font-bold mb-2'>{plan.name}</h3>
                            <div className='mb-4'>
                                <span className='text-4xl font-bold'>{plan.price}</span>
                                <span className='text-gray-400'>/month</span>
                            </div>
                            <p className='text-gray-400 mb-8'>{plan.description}</p>

                            <div className='flex-grow space-y-4 mb-8'>
                                {plan.features.map((feature) => (
                                    <div key={feature} className='flex items-center gap-3'>
                                        <CheckCircle2 size={20} className='text-green-500 flex-shrink-0' />
                                        <span className='text-gray-300'>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {plan.tier === 'Free' ? (
                                <button
                                    onClick={() => handleUpgrade(plan.tier)}
                                    disabled={user?.subscriptionTier === plan.tier}
                                    className={`w-full py-3 rounded-lg font-medium transition-all ${user?.subscriptionTier === plan.tier
                                        ? 'bg-white/10 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-gray-100'
                                        }`}
                                >
                                    {user?.subscriptionTier === plan.tier ? 'Current Plan' : 'Get Started'}
                                </button>
                            ) : (
                                user?.subscriptionTier === plan.tier ? (
                                    <button
                                        disabled
                                        className='w-full py-3 rounded-lg font-medium transition-all bg-white/10 text-gray-400 cursor-not-allowed'
                                    >
                                        Current Plan
                                    </button>
                                ) : (
                                    <PayPalButtons
                                        style={{ layout: "vertical" }}
                                        createOrder={async (data, actions) => {
                                            try {
                                                const response = await axios.post(
                                                    import.meta.env.VITE_BASE_URL + '/subscription/create-order',
                                                    { tier: plan.tier },
                                                    { withCredentials: true }
                                                );
                                                return response.data.id;
                                            } catch (error) {
                                                console.error("Order creation error", error);
                                                toast.error("Could not create order");
                                                throw error;
                                            }
                                        }}
                                        onApprove={async (data, actions) => {
                                            try {
                                                const response = await axios.post(
                                                    import.meta.env.VITE_BASE_URL + '/subscription/capture-order',
                                                    { orderId: data.orderID, tier: plan.tier },
                                                    { withCredentials: true }
                                                );
                                                toast.success("Payment Successful!");
                                                if (user) {
                                                    setUser({ ...user, subscriptionTier: plan.tier as IUser['subscriptionTier'] });
                                                }
                                            } catch (error) {
                                                console.error("Payment capture error", error);
                                                toast.error("Payment failed");
                                            }
                                        }}
                                    />
                                )
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Crown, User, Mail, CreditCard, Image as ImageIcon } from 'lucide-react';

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className='min-h-screen flex items-center justify-center text-white'>
                <p>Please login to view your profile.</p>
            </div>
        );
    }

    const { name, email, subscriptionTier, thumbnailCount } = user;
    const isPremium = subscriptionTier === 'Premium' || subscriptionTier === 'Premium Pro';
    const limit = subscriptionTier === 'Premium' ? 100 : subscriptionTier === 'Premium Pro' ? Infinity : 5;

    return (
        <div className='min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-24 xl:px-32 flex justify-center'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl'
            >
                {/* Header */}
                <div className='flex flex-col md:flex-row items-center gap-6 mb-12'>
                    <div className='relative'>
                        <div className='size-24 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-pink-500/20'>
                            {name.charAt(0).toUpperCase()}
                        </div>
                        {isPremium && (
                            <div className='absolute -top-1 -right-1 bg-yellow-500 text-black p-1.5 rounded-full border-4 border-[#121212]'>
                                <Crown size={16} fill='currentColor' />
                            </div>
                        )}
                    </div>
                    <div className='text-center md:text-left'>
                        <h1 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400'>
                            {name}
                        </h1>
                        <p className='text-gray-400 mt-1 flex items-center justify-center md:justify-start gap-2'>
                            <Mail size={14} /> {email}
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className='grid gap-6 mb-8'>
                    {/* Subscription Card */}
                    <div className='bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10'>
                        <div className='flex items-center justify-between mb-6'>
                            <div className='flex items-center gap-3 text-pink-400'>
                                <CreditCard size={20} />
                                <span className='font-semibold tracking-wider text-sm uppercase'>Current Plan</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${isPremium ? 'bg-pink-500 text-white' : 'bg-gray-600 text-gray-200'
                                }`}>
                                {subscriptionTier || 'Free'}
                            </span>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex justify-between text-sm'>
                                <span className='text-gray-300 flex items-center gap-2'><ImageIcon size={14} /> Generations Used</span>
                                <span className='text-white font-medium'>{thumbnailCount} / {limit === Infinity ? '∞' : limit}</span>
                            </div>
                            <div className='w-full bg-black/40 h-2 rounded-full overflow-hidden'>
                                <div
                                    className='bg-gradient-to-r from-pink-500 to-violet-500 h-full rounded-full transition-all duration-500'
                                    style={{ width: `${limit === Infinity ? 0 : Math.min((thumbnailCount || 0) / limit * 100, 100)}%` }}
                                />
                            </div>
                            <p className='text-xs text-gray-500'>
                                {limit === Infinity
                                    ? 'You have unlimited generations.'
                                    : `You have used ${Math.round((thumbnailCount || 0) / limit * 100)}% of your monthly limit.`
                                }
                            </p>
                        </div>

                        {!isPremium && (
                            <button
                                onClick={() => navigate('/pricing')}
                                className='w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-pink-500/20 transition-all active:scale-95'
                            >
                                Upgrade to Premium
                            </button>
                        )}
                        {subscriptionTier === 'Premium' && (
                            <button
                                onClick={() => navigate('/pricing')}
                                className='w-full mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all active:scale-95'
                            >
                                Upgrade to Pro
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    className='w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-all'
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </motion.div>
        </div>
    );
}

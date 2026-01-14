import { Request, Response } from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import paypal from '@paypal/checkout-server-sdk';

const Environment = process.env.NODE_ENV === 'production'
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const client = new paypal.core.PayPalHttpClient(
    new Environment(
        process.env.PAYPAL_CLIENT_ID || 'client-id',
        process.env.PAYPAL_CLIENT_SECRET || 'client-secret'
    )
);

export const upgradeSubscription = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { tier } = req.body; // 'Free', 'Premium', 'Premium Pro'

        if (!['Free', 'Premium', 'Premium Pro'].includes(tier)) {
            return res.status(400).json({ message: 'Invalid subscription tier' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.subscriptionTier = tier;
        await user.save();

        res.json({ message: `Subscription upgraded to ${tier}`, user });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const createPayPalOrder = async (req: Request, res: Response) => {
    try {
        const { tier } = req.body;

        let price = '0';
        if (tier === 'Premium') price = '199';
        else if (tier === 'Premium Pro') price = '499';
        else return res.status(400).json({ message: 'Invalid tier' });

        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'INR', // Changed to INR as per user request
                    value: price
                }
            }]
        });

        const order = await client.execute(request);

        const { userId } = req.session;
        await Transaction.create({
            userId,
            amount: parseFloat(price),
            tier,
            paymentId: order.result.id,
            status: 'PENDING'
        });

        res.json({ id: order.result.id });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'PayPal Order Creation Failed' });
    }
};

export const capturePayPalOrder = async (req: Request, res: Response) => {
    try {
        const { orderId, tier } = req.body;
        const { userId } = req.session;

        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const capture = await client.execute(request);

        if (capture.result.status === 'COMPLETED') {
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            user.subscriptionTier = tier;
            await user.save();

            await Transaction.findOneAndUpdate(
                { paymentId: orderId },
                { status: 'COMPLETED' }
            );

            res.json({ message: 'Payment successful', user });
        } else {
            res.status(400).json({ message: 'Payment not completed' });
        }

    } catch (error: any) {
        console.error(error);
        if (req.body.orderId) {
            await Transaction.findOneAndUpdate(
                { paymentId: req.body.orderId },
                { status: 'FAILED' }
            );
        }
        res.status(500).json({ message: 'Payment Capture Failed' });
    }
};

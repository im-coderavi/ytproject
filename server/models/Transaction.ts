import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    userId: string;
    amount: number;
    tier: 'Premium' | 'Premium Pro';
    paymentId: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    createdAt: Date;
    updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        userId: { type: String, ref: 'User', required: true },
        amount: { type: Number, required: true },
        tier: { type: String, enum: ['Premium', 'Premium Pro'], required: true },
        paymentId: { type: String, required: true },
        status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
    },
    { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;

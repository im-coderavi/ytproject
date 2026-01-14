import mongoose, { Schema } from 'mongoose';
const TransactionSchema = new Schema({
    userId: { type: String, ref: 'User', required: true },
    amount: { type: Number, required: true },
    tier: { type: String, enum: ['Premium', 'Premium Pro'], required: true },
    paymentId: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
}, { timestamps: true });
const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
export default Transaction;

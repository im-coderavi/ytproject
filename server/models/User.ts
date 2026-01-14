import mongoose from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    googleId?: string;
    avatar?: string;
    subscriptionTier?: 'Free' | 'Premium' | 'Premium Pro';
    thumbnailCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true, lowercase: true },
        password: { type: String, required: false }, // Made optional for OAuth users
        googleId: { type: String, unique: true, sparse: true }, // Added googleId
        avatar: { type: String }, // Added avatar for profile picture
        subscriptionTier: { type: String, enum: ['Free', 'Premium', 'Premium Pro'], default: 'Free' },
        thumbnailCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

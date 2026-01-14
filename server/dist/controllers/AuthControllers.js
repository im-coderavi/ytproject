import User from '../models/User.js';
import bcrypt from 'bcrypt';
// Controllers For User Registration
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // find user by email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;
        return res.json({
            message: 'Account created successfully',
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                subscriptionTier: newUser.subscriptionTier,
                thumbnailCount: newUser.thumbnailCount,
                avatar: newUser.avatar,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
// Controllers For User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'This account uses Google Sign-In. Please sign in with Google.' });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // setting user data in session
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        return res.json({
            message: 'Login successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                subscriptionTier: user.subscriptionTier,
                thumbnailCount: user.thumbnailCount,
                avatar: user.avatar,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
// Controllers For User Logout
export const logoutUser = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    });
    return res.json({ message: 'Logout successful' });
};
// Controllers For User Verify
export const verifyUser = async (req, res) => {
    try {
        const { userId } = req.session;
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }
        return res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

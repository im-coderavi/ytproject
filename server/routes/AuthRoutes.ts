import express from 'express';
import passport from 'passport';
import { loginUser, logoutUser, registerUser, verifyUser } from '../controllers/AuthControllers.js';
import protect from '../middlewares/auth.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', registerUser);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/verify', protect, verifyUser);
AuthRouter.post('/logout', protect, logoutUser);

AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

AuthRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Set session data for the authenticated user
    if (req.user) {
        req.session.isLoggedIn = true;
        req.session.userId = (req.user as any)._id;
    }

    // Successful authentication, redirect to client.
    const clientUrl = process.env.CLIENT_URL || 'https://ytproject-client.vercel.app/';
    res.redirect(clientUrl);
});

export default AuthRouter;

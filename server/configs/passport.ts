import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../models/User.js';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'your-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'your-client-secret',
    callbackURL: "/api/auth/google/callback",
    proxy: true
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                return done(null, existingUser);
            }

            const existingEmailUser = await User.findOne({ email: profile.emails?.[0].value });

            if (existingEmailUser) {
                existingEmailUser.googleId = profile.id;
                existingEmailUser.avatar = profile.photos?.[0].value;
                await existingEmailUser.save();
                return done(null, existingEmailUser);
            }

            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0].value,
                avatar: profile.photos?.[0].value
            });

            await newUser.save();
            done(null, newUser);

        } catch (error) {
            done(error, undefined);
        }
    }));

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

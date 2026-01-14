import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import './configs/passport.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import AuthRouter from './routes/AuthRoutes.js';
import ThumbnailRouter from './routes/ThumbnailRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import SubscriptionRouter from './routes/SubscriptionRoutes.js';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
await connectDB();
const app = express();
app.use(helmet());
app.use(compression());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
app.use(limiter);
app.use(cors({
    origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:3000', 'https://ytproject-client.vercel.app'],
    credentials: true
}));
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is Live!');
});
app.use('/api/auth', AuthRouter);
app.use('/api/thumbnail', ThumbnailRouter);
app.use('/api/user', UserRouter);
app.use('/api/subscription', SubscriptionRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

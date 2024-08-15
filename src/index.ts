import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import './passport-config';
import logger from './middleware/logger';

dotenv.config({ path: './dev.env' });

const mongoUri = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/default-db';
const port = process.env.PORT || 8080;

mongoose.connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

const app = express();

app.use(logger);
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ redirect: '/dashboard' });
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.send('You have been logged out successfully.');
    });
});

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You are not authenticated');
    }

    const user = req.user as any;

    if (user.platform === 'eCW') {
        if (user.clinic === 'clinic1') {
            res.send('Welcome to the clinic1 dashboard under eCW');
        } else if (user.clinic === 'clinic2') {
            res.send('Welcome to the clinic2 dashboard under eCW');
        }
    } else if (user.platform === 'AMD') {
        res.send('Welcome to the AMD dashboard');
    } else if (user.platform === 'Quest') {
        res.send('Welcome to the Quest dashboard');
    } else if (user.platform === 'Behavidance') {
        res.send('Welcome to the Behavidance dashboard');
    } else if (user.platform === 'onntop') {
        res.send('Welcome to the Onntop dashboard');
    } else {
        res.send('Welcome to the general dashboard');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`App is running in ${process.env.NODE_ENV || 'development'} mode`);
});


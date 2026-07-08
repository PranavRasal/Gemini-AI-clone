import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRoutes from './routes/chat.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(currentDir, '.env') });

dns.setServers(['1.1.1.1', '8.8.8.8']);

let connectPromise = null;

export const connectToDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        return null;
    }

    if (!connectPromise) {
        connectPromise = mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log('Connected to MongoDB');
                return mongoose.connection;
            })
            .catch((error) => {
                console.warn('MongoDB connection failed, continuing with in-memory thread storage:', error.message);
                return null;
            })
            .finally(() => {
                connectPromise = null;
            });
    }

    return connectPromise;
};

const app = express();
const distPath = path.join(currentDir, 'dist');

app.use(cors());
app.use(express.json());
app.use('/api/chats', chatRoutes);

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
        return next();
    }

    return res.sendFile(path.join(distPath, 'index.html'));
});

export default app;
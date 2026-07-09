
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import connect from './Database/index.js';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';
import path from 'path';
import { fileURLToPath } from 'url';

import dns from "dns";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path : path.join(__dirname, '.env')
});
    dns.setServers(["1.1.1.1","8.8.8.8"]);
    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.warn('MongoDB connection failed, continuing with in-memory thread storage:', error.message);
        }
    };

    
const app = express();
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/chats', chatRoutes);

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
});


// import {GoogleGenAI} from '@google/genai';
// const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.5-flash',
//     contents: '5 + 9 - 3',
//   });
//   console.log(response.text);
// }
// main();
    // app.post('/test', async (req, res) => {
    //     const { contents } = req.body;
    //     try {
    //         const response = await ai.models.generateContent({
    //         model: 'gemini-2.5-flash',
    //         contents: contents,
    //     });
    //         res.json({ text: response.text });
    //     } catch (error ) {
    //         console.error('Error:', error);
    //         res.status(500).json({ error: 'An error occurred' });
    //     }
    // });

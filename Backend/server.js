
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import connect from './Database/index.js';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';

import dns from "dns";
dotenv.config({
    path : './.env'
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
const PORT = 7777;
app.use(cors());
app.use(express.json());

    app.listen(PORT, async() => {
        console.log(`Server is running on port ${PORT}`);
       await connect();
    });

    app.use('/api/chats', chatRoutes);


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

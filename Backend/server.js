
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from "dns";

dotenv.config({
    path : './.env'
});
dns.setServers(["1.1.1.1","8.8.8.8"]);

const app = express();
const PORT = 7777;
app.use(cors());
app.use(express.json());

    const connect = async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1);
        }
    };

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
       connect();
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

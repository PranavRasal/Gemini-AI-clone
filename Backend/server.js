import {GoogleGenAI} from '@google/genai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// async function main() {
//   const response = await ai.models.generateContent({
//     model: 'gemini-2.5-flash',
//     contents: '5 + 9 - 3',
//   });
//   console.log(response.text);
// }
// main();

const app = express();
const PORT = 7777;
app.use(cors());
app.use(express.json());

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    app.post('/test', async (req, res) => {
        const { contents } = req.body;
        try {
            const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
        });
            res.json({ text: response.text });
        } catch (error ) {
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    });
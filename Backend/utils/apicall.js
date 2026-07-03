import {GoogleGenAI} from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const generateContent = async (contents) => {
    
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
}

export default generateContent;
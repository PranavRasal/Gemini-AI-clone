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
        // Return the text string so route handlers can use it directly
        return response?.text ?? response;
    } catch (error) {
        console.error('Error generating content:', error);
        // Let the caller handle the error (route will return 500)
        throw error;
    }
}

export default generateContent;
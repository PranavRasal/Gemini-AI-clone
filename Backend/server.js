
import app, { connectToDatabase } from './app.js';

const PORT = process.env.PORT || 7777;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectToDatabase();
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

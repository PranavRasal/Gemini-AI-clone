import express from 'express';
import { Thread } from '../models/threads.model.js';
import generateContent from '../utils/apicall.js';

const router = express.Router();

// Create or add  thread and replay
router.post('/threads', async (req, res) => {
    const { Id, id, messages } = req.body;
    const threadId = Id ?? id;
     try{
        
        if(!messages){
            return res.status(400).json({ message: 'Messages are required.' });
        }

        // If no Id provided, create a new thread and return it
        if(!threadId){
            const newThread = new Thread({ title: messages, messages: [
                { role: 'user', content: messages }
            ] });
            const savedThread = await newThread.save();

            const aiResponse = await generateContent(messages);
            if(!aiResponse){
                return res.status(500).json({ message: 'Failed to generate content.' });
            }

            savedThread.messages.push({ role: 'assistant', content: aiResponse });
            await savedThread.save();
            return res.status(201).json(savedThread);
        }

        // Id provided: append to existing thread
        const existingThread = await Thread.findById(threadId);
        if(!existingThread){
            return res.status(404).json({ message: 'Thread not found.' });
        }
        existingThread.messages.push({ role: 'user', content: messages });
        const updatedThread = await existingThread.save();

        const response = await generateContent(messages);
        if(!response){
            return res.status(500).json({ message: 'Failed to generate content.' });
        }
        updatedThread.messages.push({ role: 'assistant', content: response });
        await updatedThread.save();
        return res.status(200).json(updatedThread);
} catch (error) {
        console.error('Failed to create thread:', error);
        return res.status(500).json({ message: 'An error occurred while creating the thread.' });
}
});

// Get all threads
router.get('/all-threads', async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 }); // Sort by updatedAt in descending order
        return res.status(200).json(threads);
    } catch (error) {
        console.error('Failed to fetch threads:', error);
        return res.status(500).json({ message: 'An error occurred while fetching threads.' });
    }
});

// Get a specific thread by ID
router.get('/threads/:threadId', async (req, res) => {
 const { threadId } = req.params;
    try {
        const thread = await Thread.findById(threadId);

        if (!thread) {
            return res.status(404).json({ message: 'Thread not found.' });
        }
       
        return res.status(200).json(thread.messages);
    }catch(error){
        console.error('Failed to fetch thread:', error);
        return res.status(500).json({ message: 'An error occurred while fetching the thread.' });
    }

});

//delete a specific thread by ID
router.delete('/threads/:threadId' , async(req , res)=>{
    const {threadId} = req.params ;
    try {
        const deletedThread = await Thread.findByIdAndDelete(threadId);
        if (!deletedThread) {
            return res.status(404).json({ message: 'Thread not found.' });
        }
        return res.status(200).json({
            message: 'Thread deleted successfully.',
            thread: deletedThread
        })
    } catch (error) {
        console.error('Failed to delete thread:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the thread.' });
    }
})

export default router;
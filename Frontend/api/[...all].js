import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const threadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: 'New chat'
    },
    messages: [messageSchema]
  },
  { timestamps: true }
);

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

let cachedConnection = globalThis.__mongoConnection;
let cachedPromise = globalThis.__mongoPromise;

async function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(process.env.MONGODB_URI)
      .then((connection) => {
        cachedConnection = connection;
        globalThis.__mongoConnection = connection;
        return connection;
      })
      .catch((error) => {
        cachedPromise = null;
        throw error;
      });

    globalThis.__mongoPromise = cachedPromise;
  }

  return cachedPromise;
}

async function generateContent(contents) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents
  });

  return response?.text ?? response;
}

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function getRoute(req) {
  const url = new URL(req.url, 'http://localhost');
  return url.pathname.replace(/^\/api/, '') || '/';
}

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    const route = getRoute(req);

    if (req.method === 'GET' && route === '/chats/all-threads') {
      const threads = await Thread.find({}).sort({ updatedAt: -1 });
      return sendJson(res, 200, threads);
    }

    if (req.method === 'POST' && route === '/chats/threads') {
      const { Id, id, messages } = req.body ?? {};
      const threadId = Id ?? id;

      if (!messages) {
        return sendJson(res, 400, { message: 'Messages are required.' });
      }

      if (!threadId) {
        const newThread = new Thread({
          title: messages,
          messages: [{ role: 'user', content: messages }]
        });

        const savedThread = await newThread.save();
        const aiResponse = await generateContent(messages);

        if (!aiResponse) {
          return sendJson(res, 500, { message: 'Failed to generate content.' });
        }

        savedThread.messages.push({ role: 'assistant', content: aiResponse });
        await savedThread.save();
        return sendJson(res, 201, savedThread);
      }

      const existingThread = await Thread.findById(threadId);
      if (!existingThread) {
        return sendJson(res, 404, { message: 'Thread not found.' });
      }

      existingThread.messages.push({ role: 'user', content: messages });
      const updatedThread = await existingThread.save();

      const response = await generateContent(messages);
      if (!response) {
        return sendJson(res, 500, { message: 'Failed to generate content.' });
      }

      updatedThread.messages.push({ role: 'assistant', content: response });
      await updatedThread.save();
      return sendJson(res, 200, updatedThread);
    }

    const threadMatch = route.match(/^\/chats\/threads\/([^/]+)$/);
    if (threadMatch) {
      const threadId = threadMatch[1];

      if (req.method === 'GET') {
        const thread = await Thread.findById(threadId);

        if (!thread) {
          return sendJson(res, 404, { message: 'Thread not found.' });
        }

        return sendJson(res, 200, thread.messages);
      }

      if (req.method === 'DELETE') {
        const deletedThread = await Thread.findByIdAndDelete(threadId);

        if (!deletedThread) {
          return sendJson(res, 404, { message: 'Thread not found.' });
        }

        return sendJson(res, 200, {
          message: 'Thread deleted successfully.',
          thread: deletedThread
        });
      }
    }

    return sendJson(res, 404, { message: 'Route not found.' });
  } catch (error) {
    console.error('API error:', error);
    return sendJson(res, 500, { message: error.message || 'Internal server error' });
  }
}
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../MyContext'

function SideBar() {
  const { id, setReply, setId } = useContext(MyContext);
  const [threads, setThreads] = useState([]);

  const fetchThreads = async () => {
    try {
      const response = await fetch('https://gemini-ai-clone-teal.vercel.app/api/chats/all-threads');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch threads');
      }

      setThreads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching threads:', error);
      setThreads([]);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const newChat = () => {
    setReply([]);
    setId(null);
  };

  const loadThreadMessages = async (threadId) => {
    try {
      const response = await fetch(`https://gemini-ai-clone-teal.vercel.app/api/chats/threads/${threadId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch thread messages');
      }

      setReply(Array.isArray(data) ? data : []);
      setId(threadId);
    } catch (error) {
      console.error('Error loading thread messages:', error);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`https://gemini-ai-clone-teal.vercel.app/api/chats/threads/${threadId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to delete thread');
      }

      setThreads((prevThreads) => prevThreads.filter((thread) => thread._id !== threadId));

      if (id === threadId) {
        setReply([]);
        setId(null);
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <section className='w-1/5 bg-[#212121] text-white p-4 flex flex-col border-r border-[#333]'>
      <button
      onClick={() => {
        newChat();
      }}
      className='w-full bg-[#333] text-white py-2 px-4 mb-4 hover:bg-[#555] flex items-center border rounded-xl  border-[#555] '>
        <i className="fa-solid fa-pen-to-square mr-2"></i>
        <span>New Chat</span>
      </button>
      <br/>

      <ul className='space-y-2'>
        {threads.map((thread) => (
          <li
            key={thread._id}
            onClick={() => loadThreadMessages(thread._id)}
            className={`p-2 rounded cursor-pointer flex items-center justify-between gap-2 border ${
              id === thread._id
                ? 'bg-[#5f5f5f] border-[#9a9a9a]'
                : 'bg-[#333] border-transparent hover:bg-[#555]'
            }`}
            title={thread.title}
          >
            <div className='truncate'>
              <i className="fa-regular fa-comments mr-2"></i>
              {thread.title}
            </div>
            <button
              type='button'
              aria-label='Delete thread'
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread._id);
              }}
              className='shrink-0 rounded p-1 hover:bg-[#666]'
            >
              <i className="fa-solid fa-trash mr-2"></i>
            </button>
          </li>
        ))}
      </ul>
      
      <div className='mt-auto pt-4'>
        <button className='w-full bg-[#333] text-white py-2 px-4 rounded-xl hover:bg-[#555] flex items-center contain-content justify-center border border-[#555]'>
          <span className='certer'>Pranav Rasal</span>
        </button>
      </div>
    </section>
  )
}

export default SideBar

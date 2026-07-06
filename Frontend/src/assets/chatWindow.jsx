import React, { useContext } from 'react'
import Chat from './chat'
import { MyContext } from '../MyContext'

function chatWindow() {
  const { prompt, setPrompt, reply, setReply , id , setId } = useContext(MyContext);

  const getReply = async () => {
    if (!prompt.trim()) {
      return;
    }

    const options ={
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body :JSON.stringify({
          messages: prompt,
          Id : id
        })
      };
    try {
      const response = await fetch('http://localhost:7777/api/chats/threads', options);
      const res = await response.json();
      console.log('Response:', res);

      if (!response.ok) {
        throw new Error(res?.message || 'Failed to send message');
      }

      const thread = res;
      setReply(thread.messages ?? []);
      setId(thread._id ?? null);
      setPrompt('');
    } catch (error) {
      console.error('Error fetching reply:', error);
    }
  }


  return (
    <div className='w-4/5 bg-[#212121] text-white p-4 flex flex-col'>


    <div className='w-4/4 bg-[#212121] text-white flex  flex-col'>
      <div className='flex w-full items-center justify-between bg-[#333] text-white p-4 border rounded-2xl  border-[#555]'>
        <div className='flex items-center text-xl space-x-2'>
          <span>Gemini AI</span>
          <i className='fa-solid fa-caret-down'></i>
        </div>
        <div className='flex text-2xl items-center'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
      </div>
    </div>

    <Chat />

    <div className='w-3/4 flex ml-35 items-center justify-between text-white p-2 border border-[#555] rounded-4xl mt-auto '>
      <input
        type='text'
        placeholder='Ask anything...'
        className='w-full bg-[#212121] text-white py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getReply();
          }
        }}
      />
       
      <button className='ml-2  text-white py-2 px-4 rounded-2xl hover:bg-[#777]'
        onClick={getReply}
      >
       
     <i className="fa-regular fa-paper-plane"></i>
      </button>
      
    </div>
    <div className=' ml-90 bg-[#212121] text-white flex flex-col mt-2'>
      <h2>Gemini AI can make mistakes , Last updated this AI on June 10, 2024 </h2>
    </div>
    
    </div>
  )
}

export default chatWindow 

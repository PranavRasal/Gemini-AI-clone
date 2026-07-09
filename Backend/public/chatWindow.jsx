import React, { useContext } from 'react'
import Chat from '../../Frontend/src/assets/chat'
import { DNA } from 'react-loader-spinner'
import { MyContext } from '../../Frontend/src/MyContext'

function chatWindow() {
  const { prompt, setPrompt, reply, setReply , id , setId } = useContext(MyContext);
  const [loading, setLoading] = React.useState(false);

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
      setLoading(true);
      const response = await fetch('https://gemini-ai-clone-teal.vercel.app/api/chats/threads', options);
      const res = await response.json();
      console.log('Response:', res);

      if (!response.ok) {
        throw new Error(res?.message || 'Failed to send message');
      }

      const thread = res;
      setPrompt('');
      setReply(thread.messages ?? []);
      setId(thread._id ?? null);
    } catch (error) {
      console.error('Error fetching reply:', error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className='flex h-full min-w-0 flex-1 flex-col gap-4 bg-[#212121] p-4 text-white overflow-hidden'>
      <div className='flex shrink-0 items-center justify-between rounded-2xl border border-[#555] bg-[#333] p-4 text-white'>
        <div className='flex items-center space-x-2 text-xl'>
          <span>Gemini AI</span>
          <i className='fa-solid fa-caret-down'></i>
        </div>
        <div className='flex items-center text-2xl'>
          <i className='fa-solid fa-circle-user'></i>
        </div>
      </div>

      <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
        <Chat />
        <div className='flex shrink-0 items-center justify-center py-4'>
          <DNA
            visible={loading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>

        <div className='flex shrink-0 items-center justify-between rounded-3xl border border-[#555] bg-[#212121] p-2 text-white'>
          <input
            type='text'
            placeholder='Ask anything...'
            className='w-full bg-transparent py-2 px-4 text-white focus:outline-none'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                getReply();
              }
              
            }}
          />

          <button
            className='ml-2 rounded-2xl px-4 py-2 text-white hover:bg-[#777]'
            onClick={getReply}
          >
            <i className="fa-regular fa-paper-plane"></i>
          </button>
        </div>

        <div className='shrink-0 pt-2 ml-90 text-sm text-[#aaa]'>
          Gemini AI can make mistakes, last updated this AI on June 10, 2024.
        </div>
      </div>
    </div>
  )
}

export default chatWindow 

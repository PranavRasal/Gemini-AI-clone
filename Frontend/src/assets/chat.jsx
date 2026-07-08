import React, { useContext } from 'react'
import { MyContext } from '../MyContext'

function chat() {
  const { reply, newChat } = useContext(MyContext);

  return (
    <div className='relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden rounded-3xl border border-[#2f2f2f] bg-linear-to-b from-[#242424] via-[#212121] to-[#1a1a1a] px-4 py-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)] scrollbar-thin scrollbar-thumb-[#555] scrollbar-track-[#212121]'>
      <div className='pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/5 to-transparent'></div>

      {newChat || reply.length === 0 ? (
        <div className='flex h-full min-h-80 items-center justify-center px-4'>
          <div className='max-w-md rounded-3xl border border-[#3a3a3a] bg-[#242424]/90 px-8 py-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f2f2f] text-2xl text-[#8fb4ff]'>
              <i className='fa-regular fa-comment-dots'></i>
            </div>
            <h2 className='text-lg font-semibold text-white'>Your chat is waiting</h2>
            <p className='mt-2 text-sm leading-6 text-[#b8b8b8]'>
              Start a conversation and the messages will stay inside this panel so the rest of the page remains clean.
            </p>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {reply.map((message, index) => {
            const isUser = message.role === 'user';

            return (
              <div
                key={`${message.role}-${index}`}
                className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser ? (
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1f4b99] text-sm font-semibold text-white shadow-lg shadow-blue-950/30'>
                    Gemini
                  </div>
                ) : null}

                <div
                  className={`max-w-[78%] rounded-3xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap shadow-lg ${
                    isUser
                      ? 'border border-[#555] bg-[#2f2f2f] text-white'
                      : 'border border-blue-500/20 bg-[#1f4b99] text-white'
                  }`}
                >
                  <div className='mb-1 text-[11px] uppercase tracking-[0.18em] text-white/60'>
                    {isUser ? 'You' : 'Gemini'}
                  </div>
                  <div className='wrap-break-word'>{message.content}</div>
                </div>

                {isUser ? (
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#373737] text-sm font-semibold text-white shadow-lg shadow-black/20'>
                    You
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default chat

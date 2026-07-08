import React, { useContext, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MyContext } from '../MyContext'

function chat() {
  const { reply, newChat } = useContext(MyContext);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [reply]);

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
                    <i className='fa-brands fa-google'></i>
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
                  <div className='wrap-break-word'>
                    {isUser ? (
                      <div className='whitespace-pre-wrap'>{message.content}</div>
                    ) : (
   <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
      h1: ({ children }) => <h1 className='text-lg font-bold mt-2 mb-2'>{children}</h1>,
      h2: ({ children }) => <h2 className='text-base font-semibold mt-2 mb-2'>{children}</h2>,
      h3: ({ children }) => <h3 className='text-sm font-semibold mt-2 mb-1'>{children}</h3>,
      p: ({ children }) => <p className='mb-2 leading-6'>{children}</p>,
      ul: ({ children }) => <ul className='mb-2 ml-5 list-disc space-y-1'>{children}</ul>,
      ol: ({ children }) => <ol className='mb-2 ml-5 list-decimal space-y-1'>{children}</ol>,
      li: ({ children }) => <li className='leading-6'>{children}</li>,
      code: ({ inline, children }) =>
      inline ? (
      <code className='rounded bg-black/30 px-1 py-0.5 text-[13px] text-[#ffea9f]'>{children}</code>
      ) : (
      <code className='block overflow-x-auto rounded-xl border border-white/15 bg-black/30 p-3 text-[13px] text-[#f8f8f2]'>
      {children}
      </code>),pre: ({ children }) => <pre className='mb-2 mt-2'>{children}</pre>,
      a: ({ href, children }) => (
      <a href={href} target='_blank' rel='noreferrer' className='underline text-[#d7e7ff]'>
      {children}</a>)
            }}
                      >{message.content || ''}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>

                {isUser ? (
                  <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#373737] text-sm font-semibold text-white shadow-lg shadow-black/20'>
                    <i className='fa-solid fa-user-gear'></i>
                  </div>
                ) : null}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}

export default chat

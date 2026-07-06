import React, { useContext } from 'react'
import { MyContext } from '../MyContext'

function chat() {
  const { reply } = useContext(MyContext);

  return (
    // <div className='flex-1 overflow-y-auto py-4 space-y-4'>
    //   {reply.length === 0 ? (
    //     <div className='text-center text-[#aaa] mt-10'>
    //       Start a conversation to see messages here.
    //     </div>
    //   ) : (
    //     reply.map((message, index) => (
    //       <div
    //         key={`${message.role}-${index}`}
    //         className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    //       >
    //         <div
    //           className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
    //             message.role === 'user'
    //               ? 'bg-[#2f2f2f] text-white border border-[#555]'
    //               : 'bg-[#1f4b99] text-white'
    //           }`}
    //         >
    //           {message.content}
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>
    <div></div>
  )
}

export default chat

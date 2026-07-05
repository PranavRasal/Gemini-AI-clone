import React from 'react'

function sideBar() {
  return (
    <section className='w-1/5 bg-[#212121] text-white p-4 flex flex-col border-r border-[#333]'>
      <button className='w-full bg-[#333] text-white py-2 px-4 mb-4 hover:bg-[#555] flex items-center border rounded-xl  border-[#555] '>
        <i className="fa-solid fa-pen-to-square mr-2"></i>
        <span>New Chat</span>
      </button>
      <br/>

      <ul className='space-y-2'>
        <li className='bg-[#333] p-2 rounded hover:bg-[#555] cursor-pointer'>
          <i className="fa-regular fa-comments mr-2"></i>Chat 1</li>
        <li className='bg-[#333] p-2 rounded hover:bg-[#555] cursor-pointer'>
           <i className="fa-regular fa-comments mr-2"></i>Chat 2</li>
        <li className='bg-[#333] p-2 rounded hover:bg-[#555] cursor-pointer'>
           <i className="fa-regular fa-comments mr-2"></i>Chat 3</li>
      </ul>
      <div className='mt-auto pt-4'>
        <button className='w-full bg-[#333] text-white py-2 px-4 rounded-xl hover:bg-[#555] flex items-center'>
          <i className="fa-solid fa-trash mr-2"></i>
          <span>Clear Conversations</span>
        </button>
      </div>
    </section>
  )
}

export default sideBar

import './App.css'
import SideBar from './assets/sideBar'
import ChatWindow from './assets/chatWindow'
import { MyContext } from './MyContext'
import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState([]);
  const [id, setId] = useState(null);
  const [preChat, setPreChat] = useState([]);
  const[newChat, setNewChat] = useState(false);

  const providerValue ={
    prompt, setPrompt,
    reply, setReply ,
    id , setId ,
    preChat, setPreChat,
    newChat, setNewChat
  } ;

  return (
    <div className='w-screen h-screen overflow-hidden bg-[#212121] flex' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <MyContext.Provider value={providerValue}>
        <SideBar />
        <ChatWindow/>
      </MyContext.Provider>
    </div>
  )
}

export default App

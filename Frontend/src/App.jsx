import './App.css'
import SideBar from './assets/sideBar'
import ChatWindow from './assets/chatWindow'
import { MyContext } from './MyContext'
import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState("")
  const [reply, setReply] = useState([]);
  const [id, setId] = useState(null);
  const providerValue ={
    prompt, setPrompt,
    reply, setReply ,
    id , setId
  } ;

  return (
    <div className=' w-screen min-h-screen bg-[#212121] flex' style={{ fontFamily: 'Roboto, sans-serif' }}>
      <MyContext.Provider value={providerValue}>
        <SideBar />
        <ChatWindow/>
      </MyContext.Provider>
    </div>
  )
}

export default App

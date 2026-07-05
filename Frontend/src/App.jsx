import './App.css'
import SideBar from './assets/sideBar'
import ChatWindow from './assets/chatWindow'
import { MyContext } from './MyContext'

function App() {
  const providerValue ={} ;

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

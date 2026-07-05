import './App.css'
import SideBar from './assets/sideBar'
import ChatWindow from './assets/chatWindow'
import { MyContext } from './MyContext'

function App() {
  const providerValue ={} ;

  return (
    <div >
      <MyContext.Provider value={providerValue}>
        <SideBar />
        <ChatWindow/>
      </MyContext.Provider>
    </div>
  )
}

export default App

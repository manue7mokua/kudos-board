import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import BoardGrid from './Components/BoardGrid/BoardGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <BoardGrid/>
    </>
  )
}

export default App

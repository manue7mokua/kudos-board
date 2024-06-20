import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import BoardPage from './Pages/BoardPage/BoardPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boards/:boardId" element={<BoardPage />} />
      </Routes>
    </Router>
  )
}


export default App

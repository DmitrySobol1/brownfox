import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import CommandPage from './pages/CommandPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/level/:level" element={<LevelPage />} />
      <Route path="/level/:level/command/:command" element={<CommandPage />} />
    </Routes>
  )
}

export default App

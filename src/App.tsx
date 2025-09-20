import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import LevelPage from './pages/LevelPage'
import CommandPage from './pages/CommandPage'
import './App.css'

function App() {
  useEffect(() => {
    // Очистка URL от Telegram Web App параметров
    const cleanUrl = () => {
      const url = new URL(window.location.href)

      // Список параметров Telegram Web App для удаления
      const telegramParams = [
        'tgWebAppData',
        'tgWebAppVersion',
        'tgWebAppPlatform',
        'tgWebAppThemeParams'
      ]

      let hasParams = false
      telegramParams.forEach(param => {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param)
          hasParams = true
        }
      })

      // Если были параметры Telegram, обновляем URL
      if (hasParams) {
        window.history.replaceState({}, '', url.pathname + url.hash)
      }
    }

    cleanUrl()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/level/:level" element={<LevelPage />} />
      <Route path="/level/:level/command/:command" element={<CommandPage />} />
      {/* Catch-all route для перенаправления на главную */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

import { useEffect, useState } from 'react'

interface TelegramWebApp {
  initData: string
  initDataUnsafe: any
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: any
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  isClosingConfirmationEnabled: boolean
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: any
  BackButton: any
  onEvent: (eventType: string, callback: () => void) => void
  offEvent: (eventType: string, callback: () => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      setWebApp(tg)

      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user)
      }

      // Устанавливаем цветовую схему
      if (tg.colorScheme === 'dark') {
        document.body.classList.add('dark-theme')
      }
    }
  }, [])

  return {
    webApp,
    user,
    isInTelegram: !!webApp
  }
}
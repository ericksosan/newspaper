import { useEffect } from 'react'
import { Button } from '../../atoms'
import { MoonIcon, SunIcon } from '../../atoms/icon'
import { twMerge } from 'tailwind-merge'
import { useLocalStorage } from '@uidotdev/usehooks'

type Appearance = 'light' | 'dark'

export const DarkThemeToggle: React.FC = () => {
  const [themeToggle, setThemeToggle] = useLocalStorage<Appearance>('appearance', 'light')
  const isDarkMode = themeToggle === 'dark'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [themeToggle, setThemeToggle])

  return (
    <Button
      onClick={() => { setThemeToggle(themeToggle === 'light' ? 'dark' : 'light') }}
      className={
        twMerge(
          `text-slate-700 transition-all duration-300 ease-in-out w-10 h-10
          flex justify-center items-center rounded-ful dark:text-gray-200 p-0 
          hover:opacity-90 hover:bg-black/5 dark:hover:bg-white/10`,
          isDarkMode ? '-rotate-[360deg]' : 'rotate-[360deg]'
        )
      } >
      {
        isDarkMode
          ? <SunIcon />
          : <MoonIcon />
      }
    </Button>
  )
}

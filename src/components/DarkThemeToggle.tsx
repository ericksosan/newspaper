import { useEffect, useState } from 'react'
import { Moon, Sun } from './Icons'

export const DarkThemeToggle: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState<boolean>(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
  }, [themeToggle])

  return (
    <button
      onClick={() => { setThemeToggle(!themeToggle) }}
      className='text-slate-800 transition-opacity duration-500 hover:opacity-70
      dark:text-gray-200 [&>svg]:animate-jump [&>svg]:animate-duration-500
      [&>svg]:animate-ease-out [&>svg]:animate-once'
    >
      {
        themeToggle
          ? <Sun />
          : <Moon />
      }
    </button>
  )
}

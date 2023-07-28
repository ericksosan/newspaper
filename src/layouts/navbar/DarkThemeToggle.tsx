import { useEffect, useState } from 'react'
import { Moon, Sun } from '../../components/Icons'

export const DarkThemeToggle: React.FC = () => {
  const [themeToggle, setThemeToggle] = useState<boolean>(false || JSON.parse(localStorage.getItem('appearance') as string) as boolean)

  useEffect(() => {
    if (localStorage.getItem('appearance') === null) {
      localStorage.setItem('appearance', JSON.stringify(themeToggle))
    } else {
      localStorage.setItem('appearance', JSON.stringify(themeToggle))
    }

    if (JSON.parse(localStorage.getItem('appearance') as string) as boolean) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
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

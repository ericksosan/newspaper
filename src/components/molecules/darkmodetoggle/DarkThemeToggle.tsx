import { useEffect, useState } from 'react'
import { Button } from '../../atoms'
import { MoonIcon, SunIcon } from '../../atoms/icon'
import { twMerge } from 'tailwind-merge'

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
    <Button
      onClick={() => { setThemeToggle(!themeToggle) }}
      className={
        twMerge(
          `text-slate-700 transition-all duration-300 ease-in-out w-10 h-10
          flex justify-center items-center rounded-full
          dark:text-gray-200 p-0 hover:opacity-90 hover:bg-black/5 dark:hover:bg-white/10`,
          themeToggle ? '-rotate-[360deg]' : 'rotate-[360deg]'
        )
      }
    >
      {
        themeToggle
          ? <SunIcon />
          : <MoonIcon />
      }
    </Button>
  )
}

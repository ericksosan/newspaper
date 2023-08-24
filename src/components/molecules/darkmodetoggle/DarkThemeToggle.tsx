import { useEffect, useState } from 'react'
import { Button } from '../../atoms'
import { MoonIcon, SunIcon } from '../../atoms/icon'

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
      className='text-slate-700 transition-opacity duration-500 hover:opacity-70
      dark:text-gray-200 [&>svg]:animate-jump [&>svg]:animate-duration-500
      [&>svg]:animate-ease-out [&>svg]:animate-once p-0'
    >
      {
        themeToggle
          ? <SunIcon />
          : <MoonIcon />
      }
    </Button>
  )
}

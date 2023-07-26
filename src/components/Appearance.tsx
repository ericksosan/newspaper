import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export const Appearance = (): JSX.Element => {
  const [appearance, setAppearance] = useState<boolean>(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
  }, [appearance])

  return (
    <button className='w-10 h-10 flex items-center
      justify-center text-xl text-slate-900
      px-3 py-2 transition-colors duration-500 ease-in-out
      hover:opacity-80 dark:text-gray-200'
      onClick={() => { setAppearance(!appearance) }}>
      {
        appearance
          ? <FontAwesomeIcon icon={faMoon} className='transition-all duration-300 ease-in-out' />
          : <FontAwesomeIcon icon={faSun} className='transition-all duration-300 ease-in-out' />
      }
    </button>
  )
}

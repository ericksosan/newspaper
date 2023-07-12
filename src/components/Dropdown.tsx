import { useEffect, useRef, useContext } from 'react'
import { Logout, UserDetails, UserOptions } from '.'
import { DropdownContext } from '../contexts/DropdownContext'

export const Dropdown = (): JSX.Element => {
  const { handleDropdownActive } = useContext(DropdownContext)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleOutside = (e: MouseEvent): void => {
      if ((!((dropdownRef.current?.contains(e.target as Node)) ?? false)) ?? false) {
        handleDropdownActive()
      }
    }
    document.addEventListener('mousedown', handleOutside)

    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="bg-white border-2 border-gray-200
      absolute right-4 top-20 w-80 flex flex-col gap-1
      dark:bg-slate-900 rounded-md p-2 shadow-sm
      dark:border-slate-700 transition-[background-color]
      duration-500 ease-in-out animate-fade-down animate-duration-500 animate-ease-in-out">
      <UserDetails />
      <hr className='rounded border-gray-200 dark:border-slate-800' />
      <UserOptions />
      <hr className='rounded border-gray-200 dark:border-slate-800' />
      <Logout />
    </div>
  )
}

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
    <div ref={dropdownRef}
      className="bg-white border border-gray-200 absolute right-4 top-20 z-10
      w-72 lg:w-80 flex flex-col gap-2 dark:bg-slate-800 dark:border-slate-700 rounded-md
      p-2 shadow-sm transition-[background-color] duration-300 ease-in-out
      animate-fade-down animate-duration-500 animate-ease-in-out
      [&>hr]:rounded [&>hr]:border-gray-200 [&>hr]:dark:border-slate-700">
      <UserDetails />
      <hr />
      <UserOptions />
      <hr />
      <Logout />
    </div>
  )
}

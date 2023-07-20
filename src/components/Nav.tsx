import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DarkThemeToggle, Avatar } from '.'
import { Dropdown } from './Dropdown'
import { DropdownProvider } from '../contexts/DropdownProvider'

export const Nav = (): JSX.Element => {
  const [isDropdownActive, setIsActiveDropdown] = useState<boolean>(false)

  const handleDropdownActive = (): void => {
    setIsActiveDropdown(!isDropdownActive)
  }

  return (
    <DropdownProvider ValueProvider={{ isDropdownActive, handleDropdownActive }}>
      <nav className="h-16 w-full flex justify-between items-center px-5 md:px-10
        border-y dark:bg-slate-800 dark:border-slate-700 relative">
        <Link to='/' className="inline-block text-xl font-bold
        text-azure-radiance-700 dark:text-gray-200">
          Newspaper
        </Link>
        <div className="flex items-center justify-between gap-5">
          <DarkThemeToggle />
          <Avatar role='button' />
        </div>
        {isDropdownActive && <Dropdown />}
      </nav>
    </DropdownProvider>
  )
}

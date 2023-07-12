import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Appearance, Avatar } from '.'
import { Dropdown } from './Dropdown'
import { DropdownProvider } from '../contexts/DropdownProvider'

export const Nav = (): JSX.Element => {
  const [isDropdownActive, setIsActiveDropdown] = useState<boolean>(false)

  const handleDropdownActive = (): void => {
    setIsActiveDropdown(!isDropdownActive)
  }

  return (
    <header className="bg-white shadow dark:bg-slate-900 transition-colors duration-300 ease-linear">
      <nav className='relative mx-auto flex justify-between items-center font-inter px-10 py-3'>
        <DropdownProvider ValueProvider={{ isDropdownActive, handleDropdownActive }}>
          <Link to='/' className="flex items-center gap-1">
            <img src="/images/logo.svg" alt="logo newspaper" className="w-6 h-6" />
            <h1 className='text-slate-900 text-xl font-bold inline-block dark:text-gray-200 underline decoration-wavy'>Newspaper</h1>
          </Link>
          <div className="flex items-center justify-between gap-3">
            <Appearance />
            <Avatar
              ripple={true}
              role='button'
            />
          </div>
          {isDropdownActive && <Dropdown />}
        </DropdownProvider>
      </nav>
    </header>
  )
}

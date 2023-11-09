import { useContext } from 'react'
import { Avatar, Logout, UserDetailsDropdown, UserOptions } from '../../molecules'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { useClickAway } from '@uidotdev/usehooks'
import { Divider } from '../../atoms'
import { DropdownMenuContext } from '../../../contexts'

export const DropdownMenu = (): JSX.Element => {
  const { user: { photoURL, fullname } } = useAuth()
  const { isDropdownOpen, handleIsDropdownOpen } = useContext(DropdownMenuContext)
  const ref = useClickAway<HTMLDivElement>(() => { handleIsDropdownOpen(false) })

  return (
    <div className="relative" ref={ref}>
      <Avatar
        img={photoURL}
        alt={fullname ?? ''}
        classNamePicture='border-2 border-slate-800 dark:border-white'
        className="hover:scale-105 transition-transform cursor-pointer duration-150
        ease-linear select-none"
        onClick={() => { handleIsDropdownOpen(true) }} />

      <div
        role='menu'
        className={
          `w-72 absolute -left-[250px] top-16 dark:bg-slate-800 rounded-xl
          after:content after:absolute after:w-3 after:h-3 after:bg-white
        dark:after:bg-slate-800 after:rotate-[45deg] after:border p-2 z-50
        dark:after:border-t-slate-700 after:border-b-transparent bg-white
        dark:after:border-l-slate-700 after:border-r-transparent after:border-l
          after:border-r after:-top-[6px] after:left-[92%] trasition-all duration-150
          animate-duration-300 animate-fade border dark:border-slate-700
        dark:text-white text-slate-900 shadow-md
          ${!isDropdownOpen ? 'hidden' : ''}`
        } >
        <UserDetailsDropdown />
        <UserOptions />
        <Divider className='dark:border-gray-700/30 w-full' />
        <Logout />
      </div>
    </div>
  )
}

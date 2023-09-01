import { Dropdown } from 'flowbite-react'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { Avatar, Logout, UserDetailsDropdown, UserOptions } from '../../molecules'
import { Divider } from '../../atoms'

export const UserDropdown = (): JSX.Element => {
  const { user } = useAuth()

  return (
    <Dropdown
      inline
      label={
        <Avatar
          img={user.photoURL ?? ''}
          alt={user.fullname ?? ''}
        />
      }
      arrowIcon={false}
      className='bg-white w-72 lg:w-80 flex flex-col gap-2 dark:bg-slate-800
      rounded-md p-2 transition-[background-color] duration-300 ease-in-out z-50 mt-4
      border'
    >
      <UserDetailsDropdown />
      <UserOptions />
      <Divider className='dark:border-gray-700/30 w-full'/>
      <Logout />
    </Dropdown>
  )
}

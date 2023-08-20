import { Dropdown } from 'flowbite-react'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { Avatar } from '..'
import { UserDetailsDropdown, UserOptions, Logout } from '.'

export const UserDropdown = (): JSX.Element => {
  const { user, userDetailsLoaded } = useAuth()

  return (
    <Dropdown
      inline
      disabled={userDetailsLoaded}
      label={
        <Avatar
          img={user.photoURL ?? ''}
          alt={user.fullname ?? ''}
        />
      }
      arrowIcon={false}
      className='bg-white w-72 lg:w-80 flex flex-col gap-2 dark:bg-slate-800
      rounded-md p-2 transition-[background-color] duration-300 ease-in-out z-50 mt-4'
    >
      <Dropdown.Header>
        <UserDetailsDropdown />
      </Dropdown.Header>
      <UserOptions />
      <Dropdown.Divider />
      <Logout />
    </Dropdown>
  )
}

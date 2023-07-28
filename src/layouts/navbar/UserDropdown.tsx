import { Dropdown } from 'flowbite-react'
import { Logout, UserDetails, UserOptions, Avatar } from '.'

export const UserDropdown = (): JSX.Element => {
  return (
    <Dropdown
      inline
      label={<Avatar />}
      arrowIcon={false}
      className='bg-white w-72 lg:w-80 flex flex-col gap-2 dark:bg-slate-800
      rounded-md p-2 transition-[background-color] duration-300 ease-in-out mt-4'
    >
      <Dropdown.Header>
        <UserDetails />
      </Dropdown.Header>
      <UserOptions />
      <Dropdown.Divider />
      <Logout />
    </Dropdown>
  )
}

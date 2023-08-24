import { Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../routes'

interface DropdownItemProps {
  to?: keyof typeof AppRoutes
  onClick?: () => void
  children: React.ReactNode
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ to = '', children, onClick }) => {
  return (
    <Dropdown.Item as={Link} to={to && AppRoutes[to]} onClick={onClick}
      className='p-3 font-semibold hover:text-azure-radiance-700 transition-colors
      ease-in-out duration-300 cursor-pointer dark:text-gray-200 border-none rounded-md
      flex gap-2 items-center [&>svg]:w-5'>
      {children}
    </Dropdown.Item>
  )
}

import { Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'

interface PropsLinkOption {
  to: string
  label: string
  icon?: JSX.Element
}

export const DropdownLinkOption: React.FC<PropsLinkOption> = ({ to, label, icon }) => {
  return (
    <Dropdown.Item as={Link} to={to}
      className='p-3 font-semibold hover:text-azure-radiance-700
      transition-colors ease-in-out duration-300 cursor-pointer dark:text-gray-200
      border-none rounded-md flex gap-2 items-center [&>svg]:w-5'>
      {icon}
      {label}
    </Dropdown.Item>
  )
}

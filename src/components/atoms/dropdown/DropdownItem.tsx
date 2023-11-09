import { Link } from 'react-router-dom'
import { AppRoutes } from '../../../routes'
import { useContext } from 'react'
import { DropdownMenuContext } from '../../../contexts'

interface DropdownItemProps {
  to: keyof typeof AppRoutes
  children: React.ReactNode
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ to, children }) => {
  const { handleIsDropdownOpen } = useContext(DropdownMenuContext)

  return (
    <Link to={to && AppRoutes[to]}
      onClick={() => { handleIsDropdownOpen(false) }}
      className='dropdown-item'>
      {children}
    </Link>
  )
}

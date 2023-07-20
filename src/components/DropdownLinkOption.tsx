import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DropdownContext } from '../contexts/DropdownContext'

interface PropsLinkOption {
  to: string
  label: string
  icon?: JSX.Element
}

export const DropdownLinkOption: React.FC<PropsLinkOption> = ({ to, label, icon }) => {
  const { handleDropdownActive } = useContext(DropdownContext)

  return (
    <Link to={to}
      className="dropdown-list flex gap-2 items-center [&>svg]:w-5 "
      onClick={handleDropdownActive}
    >
      {icon}
      {label}
    </Link>
  )
}

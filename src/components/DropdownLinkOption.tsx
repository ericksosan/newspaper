import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type IconDefinition } from '@fortawesome/fontawesome-common-types'
import { DropdownContext } from '../contexts/DropdownContext'

interface PropsLinkOption {
  to: string
  icon: IconDefinition
  label: string
  onClick?: () => void
}

export const DropdownLinkOption: React.FC<PropsLinkOption> = ({ to, icon, label, onClick }) => {
  const { handleDropdownActive } = useContext(DropdownContext)

  const handleCliks = (): void => {
    handleDropdownActive()
    if (onClick !== undefined) {
      onClick()
    }
  }

  return (
    <Link to={to}
      className="dropdown-list"
      onClick={handleCliks}
    >
      <FontAwesomeIcon icon={icon} className='mr-2' />
      {label}
    </Link>
  )
}

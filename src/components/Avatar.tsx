import { useContext } from 'react'
import { DropdownContext } from '../contexts/DropdownContext'

type Role = 'button' | 'none'

interface AvatarProps {
  role: Role
}

export const Avatar: React.FC<AvatarProps> = ({ role }) => {
  const { handleDropdownActive } = useContext(DropdownContext)

  return (
    <picture
      className='inline-block w-10 h-10 overflow-hidden rounded-full'
      role={role}
      onClick={handleDropdownActive}
    >
      <img
        src="/images/mockprofile.webp"
        alt="profile"
        loading='lazy'
        className='object-cover w-full h-full'
      />
    </picture>
  )
}

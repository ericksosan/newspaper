import { useEffect, useRef, useContext } from 'react'
import { Ripple, initTE } from 'tw-elements'
import { DropdownContext } from '../contexts/DropdownContext'

type Role = 'button' | 'none'

interface AvatarProps {
  ripple: boolean
  role: Role
}

export const Avatar: React.FC<AvatarProps> = ({ ripple, role }) => {
  const avatarRef = useRef<HTMLPictureElement>(null)
  const { handleDropdownActive } = useContext(DropdownContext)

  useEffect(() => {
    if (!ripple) {
      avatarRef.current?.removeAttribute('data-te-ripple-init')
    }

    initTE({ Ripple })
  }, [])

  return (
    <picture
      ref={avatarRef}
      className='inline-block w-10 h-10 overflow-hidden rounded-full'
      data-te-ripple-init
      data-te-ripple-color="light"
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

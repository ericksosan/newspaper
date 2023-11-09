import { useState } from 'react'
import { SkeletonAvatar } from '../../atoms'
import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  img: string | null
  alt?: string
  className?: string
  classNamePicture?: string
  onClick?: () => void
}

export const Avatar: React.FC<AvatarProps> = ({ img, alt, className, classNamePicture, onClick }) => {
  const [avatarIsLoading, setAvatarIsLoading] = useState<boolean>(true)
  return (
    <picture
      onClick={onClick}
      className={
        twMerge(
          'w-10 h-10 overflow-hidden rounded-full flex items-center',
          className,
          classNamePicture
        )
      }>
      <SkeletonAvatar className={
        twMerge(
          !avatarIsLoading
            ? 'hidden'
            : 'block',
          className
        )
      } />
      <img
        src={img ?? '/images/avatar-default.gif'}
        alt={`Profile ${alt ?? ''}`}
        onLoad={() => { setAvatarIsLoading(false) }}
        className={
          twMerge(
            'object-cover w-full h-full',
            avatarIsLoading
              ? 'hidden'
              : 'block'
          )
        }
      />
    </picture>
  )
}

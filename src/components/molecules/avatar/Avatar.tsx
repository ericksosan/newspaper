import { useState } from 'react'
import { SkeletonAvatar } from '../../atoms'
import { twMerge } from 'tailwind-merge'

interface AvatarProps {
  img: string
  alt?: string
}

export const Avatar: React.FC<AvatarProps> = ({ img, alt }) => {
  const [avatarIsLoading, setAvatarIsLoading] = useState<boolean>(true)
  return (
    <picture className='w-10 h-10 overflow-hidden rounded-full grid place-content-center'>
      <SkeletonAvatar className={
        twMerge(
          !avatarIsLoading
            ? 'hidden'
            : 'block'
        )
      } />
      <img
        src={img}
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

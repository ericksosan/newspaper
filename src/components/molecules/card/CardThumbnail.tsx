import { useState } from 'react'
import { SkeletonImage } from '../../atoms'

export const CardThumbnail = ({ imageURL }: { imageURL: string }): JSX.Element => {
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true)

  return (
    <figure className='hidden sm:flex rounded-xl overflow-hidden aspect-video items-center justify-center'>
      <SkeletonImage className={imgIsLoading ? 'sm:flex rounded-xl aspect-video' : 'sm:hidden animate-fade'} />
      <img
        src={imageURL}
        onLoad={() => { setImgIsLoading(false) }}
        className={`object-cover w-full h-full hidden aspect-auto ${!imgIsLoading ? 'sm:flex' : 'sm:hidden'}`}
      />
    </figure>
  )
}

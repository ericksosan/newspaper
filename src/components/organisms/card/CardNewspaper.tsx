import { useState } from 'react'
import { LinkRedirect, SkeletonImage, SubTitle } from '../../atoms'
import { Avatar } from '../../molecules'
import { twMerge } from 'tailwind-merge'

interface CardNewspaperProps {
  id: string
  cover: string
  title: string
  summary: string
  createdAt: string
  nameWritter: string
  avatarWritter: string
  readingTimeText: string
}

export const CardNewspaper: React.FC<CardNewspaperProps> = (props) => {
  const { id, cover, title, summary, createdAt, nameWritter, avatarWritter, readingTimeText } = props
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true)

  return (
    <LinkRedirect
      to={'NEWS'}
      pathOptional={id}
      className="flex flex-col items-center bg-white border overflow-hidden border-gray-300 dark:hover:bg-slate-900
      transition-colors duration-300 ease-out rounded-lg dark:border-gray-700 dark:bg-slate-800
      w-full sm:w-full sm:py-6 shadow-md dark:shadow-md [&>div>h5]:hover:text-azure-radiance-700 [&>div>h5]:dark:hover:text-gray-300
      [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out font-inter">
      <div className="flex flex-col justify-between p-6 gap-4 sm:py-0 w-full">
        <>
          <SkeletonImage
            className={
              twMerge(
                imgIsLoading ? 'sm:flex' : 'sm:hidden'
              )
            }
          />
          <img
            className={
              twMerge(
                'object-cover hidden h-52 w-full rounded-md',
                !imgIsLoading ? 'sm:flex' : 'sm:hidden'
              )
            }
            src={cover}
            onLoad={() => { setImgIsLoading(false) }}
          />
        </>

        <div className="inline-flex items-center">
          <Avatar img={avatarWritter} alt={nameWritter} />
          <div className="flex-grow flex flex-col pl-4">
            <div className="title-font font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
              <SubTitle>{nameWritter}</SubTitle>
            </div>
            <time className="text-gray-400 font-normal text-xs tracking-widest mt-0.5 font-montserrat">{createdAt}</time>
          </div>
        </div>
        <h5
          className="text-md font-bold tracking-tight text-gray-900 dark:text-white
          md:text-xl line-clamp-2"
        >
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400 text-sm md:text-md text-justify line-clamp-3">{summary}</p>
        <SubTitle className="dark:text-gray-400 text-sm font-medium text-slate-900">{readingTimeText}</SubTitle>
      </div>
    </LinkRedirect>
  )
}

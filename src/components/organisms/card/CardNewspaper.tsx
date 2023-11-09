import { LinkRedirect, SubTitle } from '../../atoms'
import { Avatar, CardThumbnail } from '../../molecules'

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

  return (
    <LinkRedirect
      to={'NEWS'}
      pathOptional={id}
      className="flex flex-col items-center bg-white border overflow-hidden
    dark:hover:bg-slate-900 transition-colors duration-300 ease-out rounded-xl
    dark:border-slate-700 dark:bg-slate-800 w-full sm:w-full sm:py-4
    [&>div>h5]:hover:text-azure-radiance-700 [&>div>h5]:dark:hover:text-gray-300
    [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out font-inter">
      <div className="flex flex-col justify-between p-4 gap-3 sm:py-0 w-full">
        <CardThumbnail imageURL={cover} />

        <div className="inline-flex items-center gap-x-2">
          <Avatar img={avatarWritter} alt={nameWritter} />
          <div className="flex-grow flex flex-col">
            <div className="font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
              <SubTitle>{nameWritter}</SubTitle>
            </div>
            <time className="text-gray-400 font-normal text-xs font-montserrat">{createdAt}</time>
          </div>
        </div>

        <h5 className="text-md font-semibold text-gray-900 dark:text-white
          md:text-lg line-clamp-2" >
          {title}
        </h5>
        <p className="font-medium text-gray-800 text-sm dark:text-gray-300
          md:text-md line-clamp-3">
          {summary}
        </p>
        <SubTitle className="text-sm font-normal text-slate-700 dark:text-gray-400">
          {readingTimeText}
        </SubTitle>
      </div>
    </LinkRedirect>
  )
}

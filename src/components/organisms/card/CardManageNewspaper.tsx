import { useState } from 'react'
import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { LinkRedirect, SkeletonImage } from '../../atoms'
import { ModalManageNews } from '..'
import { ArrowTopRightSquareIcon, ToothIcon, UserCircleIcon } from '../../atoms/icon'
import { useModal } from '../../../hooks'

export const CardManageNewspaper: React.FC<NewspaperAllDetails> = ({ cover, createdAt, id, nameWritter, title }) => {
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true)
  const { isModalOpen, handlerToggleModal } = useModal()

  return (
    <figure className="shadow-sm font-inter h-auto w-full flex flex-col rounded-md
      overflow-hidden border border-slate-300 dark:bg-slate-800 dark:border-slate-700
      dark:text-gray-200 animate-fade duration-300 ease-in">
      <div className="border-none overflow-hidden rounded-b-xl relative aspect-video">
        <div className="flex items-start flex-col justify-between absolute h-full
          w-full bg-gradient-to-b from-slate-900 z-10">
          <div className="flex items-start justify-between w-full p-4">
            <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
          bg-azure-radiance-700 text-gray-200 flex gap-0.5 items-center">
              <UserCircleIcon className="w-4" />
              {nameWritter}
            </span>
            <button
              type="button"
              className='hover:hover:opacity-80 top-0 text-white'
              onClick={() => { handlerToggleModal(true) }}>
              <ToothIcon className="w-5 h-5 fill-white" />
            </button>
          </div>
          <div className="self-end bg-white dark:bg-slate-800 flex items-end
          p-2.5 rounded-ss-md">
            <span className="text-slate-900 dark:text-gray-200 text-sm block
            font-semibold">
              {createdAt}
            </span>
          </div>
        </div>
        <SkeletonImage className={`w-full h-full ${imgIsLoading ? 'flex' : 'hidden'}`} />
        <img
          src={cover}
          onLoad={() => { setImgIsLoading(false) }}
          className={`object-cover h-full w-full aspect-auto ${!imgIsLoading ? 'flex' : 'hidden'}`}
          alt={title}
        />
      </div>
      <div className="p-4 w-full flex flex-col gap-3">
        <h2 className="font-medium line-clamp-2">{title}</h2>
        <LinkRedirect
          to='NEWS'
          pathOptional={id}
          className='hover:opacity-80' >
          <ArrowTopRightSquareIcon className="w-5 h-5" />
        </LinkRedirect>
      </div>
      {
        isModalOpen &&
        <ModalManageNews
          newspaperId={id}
          onOpen={isModalOpen}
          handleSetOpenModal={handlerToggleModal}
        />
      }
    </figure>
  )
}

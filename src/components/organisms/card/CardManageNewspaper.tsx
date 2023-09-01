import { useContext, useState } from 'react'
import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { LinkRedirect, SkeletonImage, SubTitle, Title } from '../../atoms'
import { ModalManageNews } from '..'
import { twMerge } from 'tailwind-merge'
import { ArrowTopRightSquareIcon, ToothIcon, UserCircleIcon } from '../../atoms/icon'
import { ManageNewspaperContext } from '../../../contexts'

export const CardManageNewspaper: React.FC<NewspaperAllDetails> = ({ cover, createdAt, id, nameWritter, title }) => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [imgIsLoading, setImgIsLoading] = useState<boolean>(true)
  const { handleFillField } = useContext(ManageNewspaperContext)

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  const handleManageNewspaper = (): void => {
    setOpenModal('default')
    handleFillField(id)
  }

  return (
    <figure className="shadow-sm font-inter h-auto w-full flex flex-col rounded-md
      overflow-hidden border border-slate-300 dark:bg-slate-800 dark:border-slate-700
    dark:text-gray-200">
      <div className="border-none overflow-hidden h-52  rounded-b-xl relative">
        <div className="flex items-start flex-col justify-between absolute h-full
        w-full bg-gradient-to-b from-slate-900 z-10">
          <div className="flex items-start justify-between w-full p-4">
            <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full
          bg-azure-radiance-700 text-gray-200">
              {id}
            </span>
            <button
              type="button"
              className='hover:hover:opacity-80 top-0 text-white'
              onClick={handleManageNewspaper}>
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
        <SkeletonImage className={
          twMerge(
            'w-full h-full',
            imgIsLoading ? 'flex' : 'hidden'
          )
        } />
        <img
          src={cover}
          onLoad={() => { setImgIsLoading(false) }}
          className={
            twMerge(
              'object-cover h-full w-full',
              !imgIsLoading ? 'flex' : 'hidden'
            )
          }
          alt={title}
        />
      </div>
      <div className="p-4 w-full flex flex-col gap-3">
        <Title className="font-medium line-clamp-2">{title}</Title>
        <SubTitle className="font-regular flex font-medium text-sm gap-1">
          <UserCircleIcon className="w-4" />
          {nameWritter}
        </SubTitle>
        <div className="flex items-center gap-2 [&>button]:transition-colors
        [&>button]:duration-500 [&>button]:ease-in-out">
          <LinkRedirect
            to='NEWS'
            pathOptional={id}
            className='hover:hover:opacity-80'
          >
            <ArrowTopRightSquareIcon className="w-5 h-5" />
          </LinkRedirect>
        </div>
      </div>
      {
        openModal === 'default' && <ModalManageNews
          openModal={openModal}
          handleSetOpenModal={handleSetOpenModal}
          idNewspaper={id}
        />
      }
    </figure>
  )
}

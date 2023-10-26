
import { Button, SubTitle, Title } from '../../atoms'
import { Avatar } from '../../molecules'
import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { ModalShareOn } from '..'
import { useModal } from '../../../hooks/modal/useModal'
import { ShareIcon } from '../../atoms/icon'

export const CardNewspaperDetails: React.FC<NewspaperAllDetails> = ({ title, avatarWritter, createdAt, nameWritter, modifiedAt, readingTimeText, id, summary }) => {
  const { isModalOpen, handlerToggleModal } = useModal()

  return (
    <div className="w-full border dark:border-slate-700  dark:bg-slate-800 px-4 py-6 rounded-md font-inter">

      <div className="flex justify-between gap-3 items-center">
        <div className="flex gap-1.5 md:gap-3 items-center">
          <Avatar
            img={avatarWritter}
            alt={nameWritter}
          />
          <div className="flex flex-col">
            <Title className='text-md font-montserrat'>{nameWritter}</Title>
            <SubTitle className='text-sm text-slate-700'>
              {modifiedAt === '' ? 'Posted on '.concat(createdAt) : 'Updated on '.concat(modifiedAt)} • {readingTimeText}
            </SubTitle>
          </div>
        </div>

        <Button
          colors='dark'
          onClick={() => { handlerToggleModal(true) }}
          className='w-6 h-6 md:w-8 md:h-8 grid place-content-center text-center rounded-full p-0'>
          <ShareIcon />
        </Button>

        {
          isModalOpen &&
          <ModalShareOn
            id={id}
            summary={summary}
            title={title}
            handlerOpenModalShare={handlerToggleModal}
          />
        }
      </div>
    </div >
  )
}

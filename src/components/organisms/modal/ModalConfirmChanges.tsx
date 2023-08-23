import { Modal } from 'flowbite-react'
import { ButtonLoading } from '../../molecules'
import { Button, SubTitle } from '../../atoms'

interface ModalConfirmChangesProps {
  title: string
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  handleConfirmChanges: () => void
  isLoading?: boolean
}

export const ModalConfirmChanges: React.FC<ModalConfirmChangesProps> = ({ title, openModal, isLoading, handleSetOpenModal, handleConfirmChanges }) => {
  return (
    <Modal
      position='center'
      show={openModal === 'pop-up'}
      size="md"
      popup
      onClose={() => { handleSetOpenModal(undefined) }}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center font-inter">
          <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <SubTitle className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </SubTitle>
          <div className="flex justify-center gap-4">
            {
              isLoading === undefined
                ? <Button
                  className='w-32 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700'
                  onClick={() => { handleSetOpenModal(undefined) }}>
                  Yes, I&apos;m sure
                </Button>
                : <ButtonLoading
                  className='w-32 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700'
                  isLoading={isLoading}
                  onClick={handleConfirmChanges}>
                  Yes, I&apos;m sure
                </ButtonLoading>
            }
            <Button
              className='text-gray-900 hover:text-white border border-slate-700 hover:bg-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'
              onClick={() => { handleSetOpenModal(undefined) }}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

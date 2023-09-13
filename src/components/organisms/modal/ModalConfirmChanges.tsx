import { Modal } from 'flowbite-react'
import { ButtonLoading } from '../../molecules'
import { Button, SubTitle } from '../../atoms'
import { ExclamationMarkIcon } from '../../atoms/icon'

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
      popup
      size="md"
      position='center'
      show={openModal === 'pop-up'}
      onClose={() => { handleSetOpenModal(undefined) }}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center font-inter">
          <ExclamationMarkIcon />
          <SubTitle className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {title}
          </SubTitle>
          <div className="flex justify-center gap-4">
            {
              isLoading === undefined
                ? <Button
                  colors='red'
                  className='w-32'
                  onClick={handleConfirmChanges}>
                  Yes, I&apos;m sure
                </Button>
                : <ButtonLoading
                  color='red'
                  className='w-32'
                  isLoading={isLoading}
                  onClick={handleConfirmChanges}>
                  Yes, I&apos;m sure
                </ButtonLoading>
            }
            <Button
              colors='dark'
              onClick={() => { handleSetOpenModal(undefined) }}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

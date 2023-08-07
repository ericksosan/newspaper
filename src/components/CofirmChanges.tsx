import { Button, Modal } from 'flowbite-react'
import { Spinner } from '.'

interface ConfirmChangesProps {
  title: string
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  handleConfirmChanges: () => void
  isLoading?: boolean
}

export const ConfirmChanges: React.FC<ConfirmChangesProps> = ({ title, openModal, isLoading, handleSetOpenModal, handleConfirmChanges }) => {
  return (
    <>
      <Modal position='center' show={openModal === 'pop-up'} size="md" popup onClose={() => { handleSetOpenModal(undefined) }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmChanges}>
                {
                  isLoading !== undefined && isLoading
                    ? <Spinner />
                    : 'Yes, I\'m sure'
                }
              </Button>
              <Button color="gray" onClick={() => { handleSetOpenModal(undefined) }}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

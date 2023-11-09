import { Button } from '../../atoms'
import { ExclamationMarkIcon } from '../../atoms/icon'
import { Modal } from '.'

interface ModalConfirmChangesProps {
  title: string
  handlerCloseModal: (value: boolean) => void
  handleConfirmChanges: () => void
}

export const ModalConfirmChanges: React.FC<ModalConfirmChangesProps> = ({ title, handleConfirmChanges, handlerCloseModal }) => {
  const onCloseModal = (): void => {
    handlerCloseModal(false)
  }

  return (
    <Modal handlerCloseModal={onCloseModal}
      className='max-w-xl'>
      <div className="text-center font-inter flex flex-col gap-8">
        <ExclamationMarkIcon className='w-8 h-8 md:w-12 md:h-12 mx-auto text-red-700 dark:text-white' />
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm md:text-xl font-inter font-normal text-slate-900 dark:text-white w-3/4">
            {title}
          </p>
        </div>
        <div className="w-full flex justify-center gap-4 items-center">
          <Button
            colors='red'
            className='px-3 py-1.5 md:px-5 md:py-2.5'
            onClick={handleConfirmChanges}>
            Yes, I&apos;m sure
          </Button>

          <Button
            colors='dark'
            className='px-3 py-1.5 md:px-5 md:py-2.5'
            onClick={onCloseModal}>
            No, cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

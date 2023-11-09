import { useContext } from 'react'
import { Modal } from 'flowbite-react'
import { FormMarkdownEditor, ModalConfirmChanges } from '..'
import { ManageNewspaperContext } from '../../../contexts'
import { Button } from '../../atoms'
import { SaveIcon, TrashIcon } from '../../atoms/icon'
import { useModal } from '../../../hooks'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  idNewspaper: string
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal, idNewspaper }) => {
  const { isModalOpen, handlerToggleModal } = useModal()

  const {
    register,
    imageFileStatus,
    handleFileCoverChange,
    handleUpdatePostNewspaper,
    handleDeletePostNewspaper
  } = useContext(ManageNewspaperContext)

  const handleUpdateNewspaper = (): void => {
    handleUpdatePostNewspaper(idNewspaper)
    handleSetOpenModal(undefined)
  }

  const handleDeleteNewspaper = (): void => {
    handleDeletePostNewspaper(idNewspaper)
    handleSetOpenModal(undefined)
  }

  return (
    <Modal
      dismissible
      size={'6xl'}
      show={openModal === 'default'}
      onClose={() => { handleSetOpenModal(undefined) }}>
      <Modal.Header>
        Updating News
      </Modal.Header>
      <Modal.Body className='modify-scroll'>
        <FormMarkdownEditor
          register={register}
          imageFileStatus={imageFileStatus}
          handleFileCoverChange={handleFileCoverChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex gap-2 items-center justify-between">
          <Button
            colors='red'
            type="button"
            className='px-3 py-1.5 md:px-5 md:py-2.5 w-auto flex items-center gap-1'
            onClick={() => { handlerToggleModal(true) }}>
            <TrashIcon />
            Delete news
          </Button>
          <Button
            colors='blue'
            type="button"
            className='px-3 py-1.5 md:px-5 md:py-2.5 w-auto flex items-center gap-1'
            onClick={handleUpdateNewspaper}>
            <SaveIcon />
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
      {
        isModalOpen &&
        <ModalConfirmChanges
          handlerCloseModal={handlerToggleModal}
          handleConfirmChanges={handleDeleteNewspaper}
          title='Are you sure you want to delete this newspaper?' />
      }
    </Modal>
  )
}

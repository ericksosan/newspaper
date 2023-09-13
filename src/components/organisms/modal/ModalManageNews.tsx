import { useContext, useState } from 'react'
import { Modal } from 'flowbite-react'
import { FormMarkdownEditor, ModalConfirmChanges } from '..'
import { ManageNewspaperContext } from '../../../contexts'
import { Button } from '../../atoms'
import { SaveIcon, TrashIcon } from '../../atoms/icon'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  idNewspaper: string
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal, idNewspaper }) => {
  const [openModalConfirm, setOpenModalConfirm] = useState<string | undefined>()
  const {
    register,
    imageFileStatus,
    handleFileCoverChange,
    handleUpdatePostNewspaper,
    handleDeletePostNewspaper
  } = useContext(ManageNewspaperContext)

  const handleSetOpenModalConfirm = (action: string | undefined): void => {
    setOpenModalConfirm(action)
  }

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
            className='flex gap-1 items-center font-medium pr-2 p-2 md:px-2 md:pr-3 md:text-base text-xs'
            onClick={() => { handleSetOpenModalConfirm('pop-up') }}>
            <TrashIcon />
            Delete news
          </Button>
          <Button
            colors='blue'
            type="button"
            className='w-auto flex gap-1 items-center font-medium pr-2 p-2 md:px-2 md:pr-3 md:text-base text-xs'
            onClick={handleUpdateNewspaper}>
            <SaveIcon />
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
      <ModalConfirmChanges
        openModal={openModalConfirm}
        handleSetOpenModal={handleSetOpenModalConfirm}
        handleConfirmChanges={handleDeleteNewspaper}
        title='Are you sure you want to delete this newspaper?' />
    </Modal>
  )
}

import { useContext, useState } from 'react'
import { Modal } from 'flowbite-react'
import { FormMarkdownEditor, ModalConfirmChanges } from '..'
import { ManageNewspaperContext } from '../../../contexts'
import { ButtonLoading, FormAlert } from '../../molecules'
import { Button } from '../../atoms'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  idNewspaper: string
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal, idNewspaper }) => {
  const {
    alert,
    register,
    isLoading,
    imageFileStatus,
    handleFileCoverChange,
    handleUpdatePostNewspaper,
    handleDeletePostNewspaper
  } = useContext(ManageNewspaperContext)

  const [openModalConfirm, setOpenModalConfirm] = useState<string | undefined>()

  const handleSetOpenModalConfirm = (action: string | undefined): void => {
    setOpenModalConfirm(action)
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
      <Modal.Header className='flex flex-row'>
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
        <div className="w-full flex gap-2 items-center justify-between flex-col md:flex-row">
          <div className="flex gap-2 w-full md:w-96">
            <ButtonLoading
              color='blue'
              type="button"
              isLoading={isLoading}
              onClick={() => { handleUpdatePostNewspaper(idNewspaper) }}
            >
              Save Changes
            </ButtonLoading>
            <Button
              colors='red'
              type="button"
              onClick={() => { handleSetOpenModalConfirm('pop-up') }}
            >
              Delete
            </Button>
          </div>
          {
            (alert.message.length > 0 && alert.message !== undefined) &&
            <FormAlert alert={alert} className=' p-2 m-0' />
          }
        </div>
      </Modal.Footer>
      <ModalConfirmChanges
        isLoading={isLoading}
        openModal={openModalConfirm}
        handleSetOpenModal={handleSetOpenModalConfirm}
        handleConfirmChanges={handleDeleteNewspaper}
        title='Are you sure you want to delete this newspaper?' />
    </Modal>
  )
}

import { useContext } from 'react'
import { Modal } from 'flowbite-react'
import { FormMarkdownEditor } from '..'
import { ManageNewspaperContext } from '../../../contexts'
import { ButtonLoading, FormAlert } from '../../molecules'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
  idNewspaper: string
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal, idNewspaper }) => {
  const { handleUpdatePostNewspaper, handleDeletePostNewspaper, alert, isLoading, register } = useContext(ManageNewspaperContext)

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
        <FormMarkdownEditor register={register} />
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full flex gap-2 items-center justify-between flex-col md:flex-row">
          <div className="flex gap-2 w-96">
            <ButtonLoading
              color='blue'
              type="button"
              isLoading={isLoading}
              onClick={() => { handleUpdatePostNewspaper(idNewspaper) }}
            >
              Save Changes
            </ButtonLoading>
            <ButtonLoading
              color='red'
              type="button"
              isLoading={isLoading}
              onClick={handleDeleteNewspaper}
            >
              Delete
            </ButtonLoading>
          </div>
          {(alert.message.length > 0 && alert.message !== undefined) && <FormAlert alert={alert} className=' p-2 m-0' />}
        </div>
      </Modal.Footer>
    </Modal>
  )
}

import { Modal } from 'flowbite-react'
import { MarkdownEditor } from '../..'
import { useMarkdownEditor } from '../../../hooks'
import { Button } from '../../atoms'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal }) => {
  const { formMarkdownEditor, handleInputChange } = useMarkdownEditor()

  return (
    <Modal
      dismissible
      size={'6xl'}
      show={openModal === 'default'}
      onClose={() => { handleSetOpenModal(undefined) }}>
      <Modal.Header>Updating News</Modal.Header>
      <Modal.Body className='modify-scroll'>
        <MarkdownEditor
          formMarkdownEditor={formMarkdownEditor}
          handleInputChange={handleInputChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          onClick={() => { handleSetOpenModal(undefined) }}
          className="bg-azure-radiance-700 hover:bg-azure-radiance-800 w-32 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save Changes
        </Button>
        <Button
          type="button"
          onClick={() => { handleSetOpenModal(undefined) }}
          className="w-32 focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

import { Modal } from 'flowbite-react'
import { MarkdownEditor } from '.'
import { useMarkdownEditor } from '../hooks'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal }) => {
  const { formMarkdownEditor, handleInputChange } = useMarkdownEditor()
  return (
    <>
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
        <Modal.Footer
          className='[&>button]:rounded-md [&>button]:text-sm [&>button]:px-5
          [&>button]:py-2.5 [&>button]:font-medium [&>button]:text-white'>
          <button
            data-modal-hide="defaultModal"
            type="button"
            onClick={() => { handleSetOpenModal(undefined) }}
            className="bg-azure-radiance-700 hover:bg-azure-radiance-800"
          >
            Save Changes
          </button>
          <button
            data-modal-hide="defaultModal"
            type="button"
            onClick={() => { handleSetOpenModal(undefined) }}
            className="bg-red-700 hover:bg-red-800"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

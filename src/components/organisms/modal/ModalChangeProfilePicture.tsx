import { Modal } from '.'
import { UpdateProfilePicture } from '..'

interface ModalChangeProfilePictureProps {
  handlerCloseModal: () => void
}

export const ModalChangeProfilePicture: React.FC<ModalChangeProfilePictureProps> = ({ handlerCloseModal }) => {
  return (
    <Modal handlerCloseModal={handlerCloseModal}>
      <UpdateProfilePicture />
    </Modal>
  )
}

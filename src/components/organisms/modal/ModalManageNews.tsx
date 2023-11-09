import ReactDOM from 'react-dom'
import { FormMarkdownEditor, ModalConfirmChanges } from '..'
import { Button } from '../../atoms'
import { SaveIcon, TrashIcon, XCloseIcon } from '../../atoms/icon'
import { useModalManageNews } from '../../../hooks'

interface ModalProps {
  onOpen: boolean
  newspaperId: string
  handleSetOpenModal: (status: boolean) => void
}

export const ModalManageNews: React.FC<ModalProps> = ({ handleSetOpenModal, newspaperId, onOpen }) => {
  const {
    handleDeletePostNewspaper,
    handleDragLeave,
    handleDragOver,
    handleDropThumbnail,
    handleFileCoverChange,
    handlerToggleModal,
    handleUpdatePostNewspaper,
    isThumbnailOver,
    message,
    oldThumbnail,
    fileThumbnail,
    register,
    isModalOpen
  } = useModalManageNews(onOpen, newspaperId, handleSetOpenModal)

  return ReactDOM.createPortal(
    <div role="dialog" className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-black/40
    items-center p-4 md:p-8 overflow-x-hidden overflow-hidden md:inset-0 min-h-screen max-h-full">

      <div
        className="w-full max-w-5xl p-5 animate-fade animate-duration-150 animate-ease-linear
        relative mx-auto my-auto rounded-xl shadow-lg bg-white dark:bg-slate-900
        border dark:border-slate-700 flex flex-col gap-y-3">

        <div className="w-full flex flex-auto justify-between">
          <h1 className='font-semibold text-lg text-slate-900 dark:text-white'>Updating News</h1>
          <button
            onClick={() => { handleSetOpenModal(false) }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full text-slate-900
          hover:bg-black/5 dark:hover:bg-white/10 dark:text-white grid
            place-content-center">
            <XCloseIcon className="md:w-5 md:h-5" />
          </button>
        </div>

        <div className='text-center p-3 md:p-5 flex-auto justify-center gap-2 h-full
        max-h-[500px] overflow-y-scroll modify-scroll'>
          <FormMarkdownEditor
            cover={oldThumbnail ?? ''}
            fileThumbnail={fileThumbnail}
            handleDragLeave={handleDragLeave}
            isThumbnailOver={isThumbnailOver}
            handleDropThumbnail={handleDropThumbnail}
            handleDragOver={handleDragOver}
            register={register}
            errorMessage={message}
            handleFileCoverChange={handleFileCoverChange} />
        </div>

        <div className="w-full flex gap-2 items-center justify-between py-1">
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
            onClick={handleUpdatePostNewspaper}>
            <SaveIcon />
            Save Changes
          </Button>
        </div>

      </div>

      {
        isModalOpen &&
        <ModalConfirmChanges
          handlerCloseModal={handlerToggleModal}
          handleConfirmChanges={handleDeletePostNewspaper}
          title='Are you sure you want to delete this newspaper?' />
      }
    </div>, document.body
  )
}

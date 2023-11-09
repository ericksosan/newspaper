import { useContext, useEffect, useState } from 'react'
import { useMarkdownEditorForm, useModal } from '..'
import { ManageNewspaperContext } from '../../contexts'
import { type UseFormRegister } from 'react-hook-form'
import { type FormMarkdownEditor } from '../../types'
import toast from 'react-hot-toast'
import { uploadImage } from '../../firebase/storage/uploadImage'
import { deleteNewspaper, updateNewspaper } from '../../firebase/database/newspaper'
import { toastOptions } from '../../utils'

interface UseModalManageNews {
  handlerToggleModal: (status: boolean) => void
  register: UseFormRegister<FormMarkdownEditor>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  message: string
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  isThumbnailOver: boolean
  handleDropThumbnail: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleUpdatePostNewspaper: () => void
  handleDeletePostNewspaper: () => void
  fileThumbnail: File | null
  oldThumbnail: string | null
  isModalOpen: boolean
}

export const useModalManageNews = (onOpen: boolean, newspaperId: string, handleSetOpenModal: (status: boolean) => void): UseModalManageNews => {
  const { isModalOpen, handlerToggleModal } = useModal()
  const [oldThumbnail, setOldThumbnail] = useState<string | null>(null)

  useEffect(() => {
    document.querySelector('body')?.classList.toggle('overflow-hidden', onOpen)
  }, [onOpen, isModalOpen])

  const { newspaper, onDeleteNewspaper, onUpdateNewspaper } = useContext(ManageNewspaperContext)

  const {
    register,
    setValue,
    handleSubmit,
    handleFileCoverChange,
    validateFormMarkdownEditor,
    message,
    fileThumbnail,
    handleDragLeave,
    isThumbnailOver,
    handleDropThumbnail,
    handleDragOver
  } = useMarkdownEditorForm()

  useEffect(() => {
    const newspaperFound = newspaper.find((news) => news.id === newspaperId)

    if (!newspaperFound) return

    const { cover, title, content } = newspaperFound
    setOldThumbnail(cover)
    setValue('title', title)
    setValue('content', content)
    setValue('cover', cover)
  }, [])

  const handleUpdatePostNewspaper = (): void => {
    void handleSubmit((data) => {
      if ((!validateFormMarkdownEditor(data))) return

      const compressOptions = {
        width: 1280,
        height: 720,
        quality: 1,
        size: 800
      }

      if (!fileThumbnail) {
        void toast.promise(
          updateNewspaper(newspaperId, data),
          {
            loading: 'Saving changes...',
            success: () => {
              handleSetOpenModal(false)
              onUpdateNewspaper(newspaperId, data)
              return 'The newspaper was successfully updated.'
            },
            error: () => 'An error occurred while updating the news.'
          },
          toastOptions
        )
        return
      }

      void toast.promise(
        uploadImage(fileThumbnail, 'NEWSPAPPER_THUMBNAILS', data.cover ?? null, compressOptions),
        {
          loading: 'Updating thumbnail...',
          success: (url) => {
            const newspaper = {
              ...data,
              cover: url
            }

            void toast.promise(
              updateNewspaper(newspaperId, newspaper),
              {
                loading: 'Saving changes...',
                success: () => {
                  handleSetOpenModal(false)
                  onUpdateNewspaper(newspaperId, newspaper)
                  return 'The newspaper was successfully updated.'
                },
                error: () => 'An error occurred while updating the news.'
              },
              toastOptions
            )

            return 'Success the file has been updated.'
          },
          error: () => 'Error! Something happened while updating the selected file.'
        }, toastOptions
      )
    })()
  }

  const handleDeletePostNewspaper = (): void => {
    void toast.promise(
      deleteNewspaper(newspaperId),
      {
        loading: 'Deleting news...',
        success: () => {
          handleSetOpenModal(false)
          onDeleteNewspaper(newspaperId)
          return 'The newspaper was successfully deleted.'
        },
        error: () => 'An error occurred while deleting the news.'
      },
      toastOptions
    )
    handleSetOpenModal(false)
  }

  return {
    handleDeletePostNewspaper,
    handleDragLeave,
    handleDragOver,
    handleDropThumbnail,
    handleFileCoverChange,
    handlerToggleModal,
    handleUpdatePostNewspaper,
    isThumbnailOver,
    message,
    isModalOpen,
    register,
    fileThumbnail,
    oldThumbnail
  }
}

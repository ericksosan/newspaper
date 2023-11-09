import { useState } from 'react'
import { type UseFormRegister } from 'react-hook-form'
import type { FormMarkdownEditor } from '../../types'
import { useAuth } from '../../firebase/hooks/useAuth'
import { type NewspaperDetails, createNewspaper } from '../../firebase/database/newspaper'
import { useNavigate } from 'react-router-dom'
import { useMarkdownEditorForm } from '..'
import { toast } from 'react-hot-toast'
import { toastOptions } from '../../utils'
import { uploadImage } from '../../firebase/storage/uploadImage'

interface UseCreateNews {
  section: string
  message: string
  isSectionChanged: boolean
  handleSwitchPreviewEdit: () => void
  formMarkdownEditor: FormMarkdownEditor
  handlePostNewspaper: () => Promise<void>
  register: UseFormRegister<FormMarkdownEditor>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileThumbnail: File | null
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDropThumbnail: (e: React.DragEvent<HTMLDivElement>) => void
  isThumbnailOver: boolean
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
}

export const useCreateNews = (): UseCreateNews => {
  const { user } = useAuth()
  const [section, setSection] = useState<string>('Create News')
  const [isSectionChanged, setIsSectionChanged] = useState<boolean>(false)
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>({} as FormMarkdownEditor)
  const {
    register,
    message,
    handleSubmit,
    validateFormMarkdownEditor,
    handleFileCoverChange,
    handleDropThumbnail,
    handleDragLeave,
    isThumbnailOver,
    fileThumbnail,
    handleDragOver
  } = useMarkdownEditorForm()

  const navigate = useNavigate()

  const handleSwitchSection = (): void => {
    setIsSectionChanged(!isSectionChanged)
    setSection(
      isSectionChanged
        ? 'Edit'
        : 'Preview'
    )
  }

  const handleSwitchPreviewEdit = (): void => {
    void handleSubmit((data) => {
      if (!validateFormMarkdownEditor(data) || !fileThumbnail) return

      handleSwitchSection()

      const dataPreview = {
        ...data,
        cover: URL.createObjectURL(fileThumbnail)
      }

      setFormMarkdownEditor(dataPreview)
    })()
  }

  const handlePostNewspaper = async (): Promise<void> => {
    void handleSubmit(async (data) => {
      if (!validateFormMarkdownEditor(data) || !fileThumbnail) return

      const compressOptions = {
        width: 1280,
        height: 720,
        quality: 0.8,
        size: 800
      }

      void toast.promise(
        uploadImage(fileThumbnail, 'NEWSPAPPER_THUMBNAILS', null, compressOptions),
        {
          loading: 'Uploading thumbnail...',
          success: (url) => {
            const newspaper = {
              ...data,
              cover: url
            }

            const newNewspaper: NewspaperDetails = {
              newspaper,
              idWritter: user.id,
              avatarWritter: user.photoURL ?? '',
              nameWritter: user.fullname ?? 'Anonymus'
            }

            void toast.promise(
              createNewspaper(newNewspaper),
              {
                loading: 'Creating newspaper...',
                success: (id) => {
                  navigate(`/new/${id}`, { replace: true })
                  return 'The newspaper was successfully created'
                },
                error: (_err) => 'An error occurred while creating the news item.'
              },
              toastOptions
            )

            return 'Success the file has been uploaded.'
          },
          error: () => 'Error! Something happened while uploading the selected file.'
        }, toastOptions
      )
    })()
  }

  return {
    section,
    message,
    register,
    handleDragOver,
    fileThumbnail,
    isSectionChanged,
    formMarkdownEditor,
    isThumbnailOver,
    handlePostNewspaper,
    handleSwitchPreviewEdit,
    handleFileCoverChange,
    handleDropThumbnail,
    handleDragLeave
  }
}

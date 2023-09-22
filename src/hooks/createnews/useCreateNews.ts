import { useState } from 'react'
import { type UseFormRegister } from 'react-hook-form'
import type { FormMarkdownEditor, ImageFileStatus } from '../../types'
import { useAuth } from '../../firebase/hooks/useAuth'
import { type NewspaperDetails, createNewspaper } from '../../firebase/database/newspaper'
import { useNavigate } from 'react-router-dom'
import { useMarkdownEditorForm } from '..'
import { toast } from 'react-hot-toast'
import { toastOptions } from '../../utils'

interface UseCreateNews {
  section: string
  message: string
  isSectionChanged: boolean
  imageFileStatus: ImageFileStatus
  handleSwitchPreviewEdit: () => void
  formMarkdownEditor: FormMarkdownEditor
  handlePostNewspaper: () => Promise<void>
  register: UseFormRegister<FormMarkdownEditor>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useCreateNews = (): UseCreateNews => {
  const { user } = useAuth()
  const [section, setSection] = useState<string>('Create News')
  const [isSectionChanged, setIsSectionChanged] = useState<boolean>(false)
  const { register, message, handleSubmit, validateFormMarkdownEditor, handleFileCoverChange, imageFileStatus } = useMarkdownEditorForm()
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>({} as FormMarkdownEditor)

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
    if (!validateFormMarkdownEditor()) return

    handleSwitchSection()
    void handleSubmit((data) => {
      setFormMarkdownEditor(data)
    })()
  }

  const handlePostNewspaper = async (): Promise<void> => {
    if (!validateFormMarkdownEditor()) return

    void handleSubmit(async (data) => {
      const newNewspaper: NewspaperDetails = {
        newspaper: data,
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
    })()
  }

  return {
    section,
    message,
    register,
    isSectionChanged,
    formMarkdownEditor,
    handlePostNewspaper,
    handleSwitchPreviewEdit,
    handleFileCoverChange,
    imageFileStatus
  }
}

import { useState } from 'react'
import { type UseFormRegister } from 'react-hook-form'
import type { FormMarkdownEditor, ImageFileStatus } from '../../types'
import { useAuth } from '../../firebase/hooks/useAuth'
import { type NewspaperDetails, createNewspaper } from '../../firebase/database/newspaper'
import { useNavigate } from 'react-router-dom'
import { useMarkdownEditorForm } from '..'

interface UseCreateNews {
  section: string
  message: string
  isLoading: boolean
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
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSectionChanged, setIsSectionChanged] = useState<boolean>(false)
  const { register, message, handleSubmit, validateFormMarkdownEditor, reset, handleFileCoverChange, imageFileStatus } = useMarkdownEditorForm()
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

    const data: NewspaperDetails = {
      newspaper: formMarkdownEditor,
      idWritter: user.id,
      avatarWritter: user.photoURL ?? '',
      nameWritter: user.fullname ?? 'Anonymus'
    }

    try {
      setIsLoading(true)
      const id = await createNewspaper(data)
      reset()
      navigate(`/new/${id}`, { replace: true })
      setIsLoading(false)
    } catch (error) { }
  }

  return {
    section,
    message,
    register,
    isLoading,
    isSectionChanged,
    formMarkdownEditor,
    handlePostNewspaper,
    handleSwitchPreviewEdit,
    handleFileCoverChange,
    imageFileStatus
  }
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'
import type { FormMarkdownEditor } from '../../types'
import toast from 'react-hot-toast'
import { toastOptions } from '../../utils/toastOptions'
interface UseMarkdownEditorForm {
  message: string
  fileThumbnail: File | null
  reset: UseFormReset<FormMarkdownEditor>
  validateFormMarkdownEditor: (data: FormMarkdownEditor) => boolean
  register: UseFormRegister<FormMarkdownEditor>
  setValue: UseFormSetValue<FormMarkdownEditor>
  handleSubmit: UseFormHandleSubmit<FormMarkdownEditor>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDropThumbnail: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  isThumbnailOver: boolean
}

export const useMarkdownEditorForm = (): UseMarkdownEditorForm => {
  const [message, setMessage] = useState<string>('')
  const { register, handleSubmit, setValue, reset } = useForm<FormMarkdownEditor>()
  const [fileThumbnail, setFileThumbnail] = useState<File | null>(null)
  const [isThumbnailOver, setIsThumbnailOver] = useState<boolean>(false)

  const validateFormMarkdownEditor = ({ cover, title, content }: FormMarkdownEditor): boolean => {
    if (!fileThumbnail && !cover) {
      setMessage('You must choose the thumbnail!')
      return false
    }

    if (fileThumbnail) {
      if (!(/\/(jpeg|jpg|png)$/i.test(fileThumbnail.type))) {
        setMessage('Thumbnail format not allowed. Only .jpeg, .jpg or .png are allowed')
        return false
      }

      if (fileThumbnail.size >= (2000 * 1000)) {
        setMessage('The file is too large. Thumbnail must be less than 2MB')
        return false
      }
    }

    if (title === '') {
      setMessage('The title cannot be empty!')
      return false
    }

    if (content === '') {
      setMessage('The content cannot be empty!')
      return false
    }

    setMessage('')
    return true
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsThumbnailOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    setIsThumbnailOver(false)
  }

  const handleDropThumbnail = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files?.[0]

    if (!file) return

    setFileThumbnail(file)
    setIsThumbnailOver(false)

    toast.success(`The photo named ${file.name} was selected.`, toastOptions)
  }

  const handleFileCoverChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]

    if (!file) return

    setFileThumbnail(file)

    toast.success(`The photo named ${file.name} was selected.`, toastOptions)
  }

  return {
    reset,
    message,
    register,
    setValue,
    handleSubmit,
    fileThumbnail,
    handleDragOver,
    handleFileCoverChange,
    validateFormMarkdownEditor,
    handleDropThumbnail,
    handleDragLeave,
    isThumbnailOver
  }
}

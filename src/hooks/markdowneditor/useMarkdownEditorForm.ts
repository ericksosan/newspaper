import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { FormMarkdownEditor } from '../../types'

interface UseMarkdownEditorForm {
  message: string
  validateFormMarkdownEditor: () => boolean
  register: UseFormRegister<FormMarkdownEditor>
  setValue: UseFormSetValue<FormMarkdownEditor>
  handleSubmit: UseFormHandleSubmit<FormMarkdownEditor>
}

const initialFormMarkdownEditor = {
  cover: '',
  title: '',
  content: ''
}

export const useMarkdownEditorForm = (): UseMarkdownEditorForm => {
  const [message, setMessage] = useState<string>('')
  const { register, handleSubmit, control, setValue } = useForm<FormMarkdownEditor>()
  const { cover, title, content } = useWatch<FormMarkdownEditor>({ control, defaultValue: initialFormMarkdownEditor })

  const isURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  const validateFormMarkdownEditor = (): boolean => {
    if (cover === undefined || title === undefined || content === undefined) return true

    if (cover === '') {
      setMessage('The URL cannot be empty!')
      return false
    } if (!isURL.test(cover)) {
      setMessage('The URL of the cover page is invalid!')
      return false
    } else if (title === '') {
      setMessage('The title cannot be empty!')
      return false
    } else if (content === '') {
      setMessage('The content box is empty!')
      return false
    }

    setMessage('')
    return true
  }

  return {
    message,
    register,
    setValue,
    handleSubmit,
    validateFormMarkdownEditor
  }
}

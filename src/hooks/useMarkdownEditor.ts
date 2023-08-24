import { useState } from 'react'
import type { FormMarkdownEditor } from '../types'
import { type NewspaperDetails, createNewspaper } from '../firebase/database/newspaper'
import { useAuth } from '../firebase/hooks/useAuth'

interface UseMarkdownEditor {
  controllers: boolean
  isFormValid: boolean
  isLoading: boolean
  section: string
  message: string
  formMarkdownEditor: FormMarkdownEditor
  handleInputChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleSwitchControllers: () => void
  handleSavePostNewspaper: () => Promise<void>
}

const initialFormMarkdownEditor = {
  cover: '',
  title: '',
  content: ''
}

export const useMarkdownEditor = (): UseMarkdownEditor => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [controllers, setControllers] = useState<boolean>(false)
  const [section, setSection] = useState<string>('Create News')
  const [message, setMessage] = useState<string>('')
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>(initialFormMarkdownEditor)

  const { cover, title, content } = formMarkdownEditor
  const isURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  const validateFormMarkdownEditor = (): boolean => {
    if (cover === '') {
      setMessage('The URL cannot be empty!')
      return false
    } if (!isURL.test(cover)) {
      setMessage('The URL of the cover page is invalid!')
      return false
    } else if (title === '') {
      console.log(title.length)
      setMessage('The title cannot be empty!')
      return false
    } else if (content === '') {
      setMessage('The content box is empty!')
      return false
    }
    setMessage('')
    return true
  }

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { name, value } = target
    setFormMarkdownEditor({
      ...formMarkdownEditor,
      [name]: value.trimStart()
    })
  }

  const handleSwitchControllers = (): void => {
    setControllers(!controllers)
    setSection(
      controllers
        ? 'Edit'
        : 'Preview'
    )
  }

  const handleSavePostNewspaper = async (): Promise<void> => {
    if (!validateFormMarkdownEditor()) return
    setFormMarkdownEditor(initialFormMarkdownEditor)
    const data: NewspaperDetails = {
      newspaper: formMarkdownEditor,
      idWritter: user.id,
      avatarWritter: user.photoURL ?? '',
      nameWritter: user.fullname ?? 'Anonymus'
    }

    // Erick, don't forget this code snippet above.
    try {
      setIsLoading(true)
      await createNewspaper(data)
      setIsLoading(false)
    } catch (error) { }
  }

  const isFormValid = (formMarkdownEditor.content.length === 0 ||
    formMarkdownEditor.title.length === 0 || !isURL.test(formMarkdownEditor.cover))

  return {
    controllers,
    isFormValid,
    isLoading,
    section,
    message,
    formMarkdownEditor,
    handleInputChange,
    handleSwitchControllers,
    handleSavePostNewspaper
  }
}

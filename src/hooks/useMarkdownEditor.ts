import { useState, useEffect } from 'react'
import type { FormMarkdownEditor } from '../types'

interface UseMarkdownEditor {
  controllers: boolean
  isFormValid: boolean
  section: string
  message: string
  formMarkdownEditor: FormMarkdownEditor
  handleInputChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleSwitchControllers: () => void
  handleSavePostNewspaper: () => void
}

const initialFormMarkdownEditor = {
  cover: '',
  title: '',
  content: ''
}

export const useMarkdownEditor = (): UseMarkdownEditor => {
  const [controllers, setControllers] = useState<boolean>(false)
  const [section, setSection] = useState<string>('Create News')
  const [message, setMessage] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>((JSON.parse(localStorage.getItem('lastnews') as string) as FormMarkdownEditor) || initialFormMarkdownEditor)

  const { cover, title, content } = formMarkdownEditor
  const isURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  useEffect(() => {
    if (localStorage.getItem('lastnews') === null) {
      localStorage.setItem('lastnews', JSON.stringify(formMarkdownEditor))
    } else {
      localStorage.setItem('lastnews', JSON.stringify(formMarkdownEditor))
    }
  }, [formMarkdownEditor])

  const validateFormMarkdownEditor = (): boolean => {
    if (!isURL.test(cover.trim())) {
      setMessage('The URL of the cover page cannot be invalid!')
      return false
    }

    if (title.trim().length <= 0) {
      setMessage('The title cannot be empty!')
      return false
    }

    if (content.trim().length <= 0) {
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
    validateFormMarkdownEditor()
  }

  const handleSwitchControllers = (): void => {
    setControllers(!controllers)
    setSection(
      controllers
        ? 'Edit'
        : 'Preview'
    )
    validateFormMarkdownEditor()
  }

  const handleSavePostNewspaper = (): void => {
    if (validateFormMarkdownEditor()) {
      console.log('sending data...')
      // localStorage.removeItem('lastnews')
      // setFormMarkdownEditor(initialFormMarkdownEditor)
      // Erick, don't forget this code snippet above.
    }
  }

  const isFormValid = (formMarkdownEditor.content.length === 0 ||
    formMarkdownEditor.title.length === 0 || !isURL.test(formMarkdownEditor.cover))

  return {
    controllers,
    isFormValid,
    section,
    message,
    formMarkdownEditor,
    handleInputChange,
    handleSwitchControllers,
    handleSavePostNewspaper
  }
}

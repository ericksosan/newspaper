import { useState } from 'react'
import { ManageNewspaperContext, type ManageNewspaperContextValues } from '..'
import { deleteNewspaper, getNewspaperByOne, updateNewspaper } from '../../firebase/database/newspaper'
import type { Alert } from '../../types'
import { useMarkdownEditorForm } from '../../hooks'

export const ManageNewspaperProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<Alert>({ message: '', code: 'none' })
  const { register, message, handleSubmit, validateFormMarkdownEditor, setValue } = useMarkdownEditorForm()
  const [updateChange, setUpdateChange] = useState<boolean>(false)

  const handleFillField = (id: string): void => {
    getNewspaperByOne(id)
      .then(res => {
        if (res !== null) {
          const { cover, title, content } = res
          setValue('cover', cover)
          setValue('title', title)
          setValue('content', content)
        }
      })
      .catch(_err => { })
    setAlert({ message: '', code: 'none' })
  }

  const handleUpdatePostNewspaper = (id: string): void => {
    if (!validateFormMarkdownEditor()) return

    void handleSubmit((data) => {
      setIsLoading(true)
      updateNewspaper(id, data)
        .then(_res => {
          setAlert({ code: 'success', message: 'The newspaper was successfully updated' })
          setUpdateChange(!updateChange)
        })
        .catch((_err) => {
          setAlert({ code: 'error', message: 'An error occurred while updating the news' })
        })
        .finally(() => { setIsLoading(false) })
    })()
  }

  const handleDeletePostNewspaper = (id: string): void => {
    setIsLoading(true)
    deleteNewspaper(id)
      .then(_res => {
        setAlert({ code: 'success', message: 'The newspaper was successfully deleted' })
        setUpdateChange(!updateChange)
      })
      .catch((_err) => {
        setAlert({ code: 'error', message: 'An error occurred while deleting the news' })
      })
      .finally(() => { setIsLoading(false) })
  }

  const values: ManageNewspaperContextValues = {
    alert,
    message,
    register,
    isLoading,
    handleFillField,
    handleDeletePostNewspaper,
    handleUpdatePostNewspaper,
    updateChange
  }

  return (
    <ManageNewspaperContext.Provider value={values}>
      {children}
    </ManageNewspaperContext.Provider>
  )
}

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ManageNewspaperContext, type ManageNewspaperContextValues } from '..'
import { type NewspaperAllDetails, deleteNewspaper, updateNewspaper } from '../../firebase/database/newspaper'
import { useMarkdownEditorForm } from '../../hooks'
import type { FormMarkdownEditor } from '../../types'
import { toastOptions } from '../../utils'

export const ManageNewspaperProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([] as NewspaperAllDetails[])

  const {
    register,
    setValue,
    handleSubmit,
    imageFileStatus,
    handleFileCoverChange,
    validateFormMarkdownEditor
  } = useMarkdownEditorForm()

  const handleSetNewspaper = (listNewspaper: NewspaperAllDetails[]): void => {
    setNewspaper(listNewspaper)
  }

  const handleFillField = (id: string): void => {
    const res = newspaper.find((news) => news.id === id)

    if (res) {
      const { cover, title, content } = res
      setValue('cover', cover)
      setValue('title', title)
      setValue('content', content)
    }
  }

  const onUpdateNewspaper = (id: string, data: FormMarkdownEditor): void => {
    setNewspaper(
      newspaper.map((news) => {
        if (news.id === id) {
          return {
            ...news,
            ...data
          }
        }

        return news
      })
    )
  }

  const onDeleteNewspaper = (id: string): void => {
    setNewspaper(
      newspaper.filter((news) => news.id !== id)
    )
  }

  const handleUpdatePostNewspaper = (id: string): void => {
    if (!validateFormMarkdownEditor()) return

    void handleSubmit((data) => {
      void toast.promise(updateNewspaper(id, data),
        {
          loading: 'Saving changes...',
          success: (_data) => {
            onUpdateNewspaper(id, data)
            return 'The newspaper was successfully updated.'
          },
          error: (_err) => 'An error occurred while updating the news.'
        },
        toastOptions
      )
    })()
  }

  const handleDeletePostNewspaper = (id: string): void => {
    void toast.promise(deleteNewspaper(id),
      {
        loading: 'Deleting news...',
        success: (_data) => {
          onDeleteNewspaper(id)
          return 'The newspaper was successfully deleted.'
        },
        error: (_err) => 'An error occurred while deleting the news.'
      },
      toastOptions
    )
  }

  const values: ManageNewspaperContextValues = {
    register,
    newspaper,
    imageFileStatus,
    handleFillField,
    handleSetNewspaper,
    handleFileCoverChange,
    handleDeletePostNewspaper,
    handleUpdatePostNewspaper
  }

  return (
    <ManageNewspaperContext.Provider value={values}>
      {children}
    </ManageNewspaperContext.Provider>
  )
}

import { useEffect, useState } from 'react'
import type { FormMarkdownEditor } from '../../types'
import { useAuth } from '../../firebase/hooks/useAuth'
import { ManageNewspaperContext, type ManageNewspaperContextValues } from '..'
import { type NewspaperAllDetails, getNewspaperByWritter } from '../../firebase/database/newspaper'

export const ManageNewspaperProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [itemsNotFound, setItemsNotFound] = useState<boolean>(false)
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([])
  const { user: { id } } = useAuth()

  useEffect(() => {
    getNewspaperByWritter(id)
      .then((items) => {
        if (items.length === 0) {
          setItemsNotFound(true)
          return
        }

        setItemsNotFound(false)
        setNewspaper(items)
      })
      .catch((_err) => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  const onUpdateNewspaper = (id: string, data: FormMarkdownEditor): void => {
    setNewspaper((prev) => (
      prev.map((news) => news.id === id
        ? { ...news, ...data }
        : news
      ))
    )
  }

  const onDeleteNewspaper = (id: string): void => {
    setNewspaper((prev) => prev.filter((news) => news.id !== id))
  }

  const values: ManageNewspaperContextValues = {
    newspaper,
    isLoading,
    itemsNotFound,
    onUpdateNewspaper,
    onDeleteNewspaper
  }

  return (
    <ManageNewspaperContext.Provider value={values}>
      {children}
    </ManageNewspaperContext.Provider>
  )
}

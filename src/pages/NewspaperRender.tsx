import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type NewspaperAllDetails, getNewspaperByOne } from '../firebase/database/newspaper'
import { MarkdownPreview } from '../components'
import type { FormMarkdownEditor } from '../types'
import { Loading } from '../components/Loading'

export const NewspaperRender = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [newspaper, setNewspaper] = useState({} as NewspaperAllDetails)

  const { id } = useParams()

  useEffect(() => {
    void fetchNewspaperByOne()
  }, [id])

  const fetchNewspaperByOne = async (): Promise<void> => {
    try {
      const res = await getNewspaperByOne(id as string)
      if (res !== null) {
        setNewspaper(res)
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  const data: FormMarkdownEditor = {
    cover: newspaper.cover,
    title: newspaper.title,
    content: newspaper.content
  }

  return (
    isLoading
      ? <Loading />
      : <div className='px-5'> <MarkdownPreview formMarkdownEditor={data} /></div>
  )
}

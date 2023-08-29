import { useState, useEffect } from 'react'
import { type NewspaperAllDetails, getNewspaperByOne } from '../../firebase/database/newspaper'
import { useParams } from 'react-router-dom'
import type { FormMarkdownEditor } from '../../types'

interface UseRenderNewspaper {
  isLoading: boolean
  newspaper: NewspaperAllDetails
  dataRenderMarkdown: FormMarkdownEditor
}

export const useRenderNewspaper = (): UseRenderNewspaper => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails>({} as NewspaperAllDetails)

  const { title, cover, content } = newspaper
  const { id } = useParams()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    getNewspaperByOne(id as string)
      .then(res => { if (res) setNewspaper(res) })
      .catch((err) => { console.log(err) })
      .finally(() => { setIsLoading(false) })
  }, [id])

  const dataRenderMarkdown: FormMarkdownEditor = {
    cover,
    title,
    content
  }

  return {
    isLoading,
    newspaper,
    dataRenderMarkdown
  }
}

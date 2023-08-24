import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { type NewspaperAllDetails, getNewspaperByOne } from '../../firebase/database/newspaper'
import type { FormMarkdownEditor } from '../../types'
import { CardNewspaperDetails, RenderMarkdown } from '../organisms'
import { Loading } from '../molecules'

export const NewspaperRender = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [newspaper, setNewspaper] = useState({} as NewspaperAllDetails)

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

  if (isLoading) return <Loading />

  return (
    <div className='w-full min-h-screen py-10 flex flex-col px-5'>
      <div className='mx-auto max-w-4xl'>
        <CardNewspaperDetails {...newspaper} />
        <RenderMarkdown {...dataRenderMarkdown} />
      </div>
    </div>
  )
}

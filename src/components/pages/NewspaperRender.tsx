import { CardNewspaperDetails, Comments, NewspaperNotFound, RenderMarkdown } from '../organisms'
import { Loading } from '../molecules'
import { useRenderNewspaper } from '../../hooks'
import { CommentProvider } from '../../firebase/contexts/CommentProvider'

const NewspaperRender = (): JSX.Element => {
  const { isLoading, newspaper, newsNotFound, dataRenderMarkdown } = useRenderNewspaper()

  if (isLoading) return <Loading />

  if (newsNotFound) return <NewspaperNotFound />

  return (
    <section className='w-full min-h-screen py-10 flex flex-col px-5'>
      <article className='mx-auto max-w-4xl min-h-screen animate-fade animate-duration-300 animate-ease-linear'>
        <CardNewspaperDetails {...newspaper} />
        <RenderMarkdown {...dataRenderMarkdown} />
        <CommentProvider newspaper={newspaper}>
          <Comments />
        </CommentProvider>
      </article>
    </section>
  )
}

export default NewspaperRender

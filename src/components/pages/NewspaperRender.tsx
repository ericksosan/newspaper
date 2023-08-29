import { CardNewspaperDetails, RenderMarkdown } from '../organisms'
import { Loading } from '../molecules'
import { useRenderNewspaper } from '../../hooks'

const NewspaperRender = (): JSX.Element => {
  const { isLoading, newspaper, dataRenderMarkdown } = useRenderNewspaper()

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

export default NewspaperRender

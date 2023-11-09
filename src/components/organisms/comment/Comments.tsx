import { memo, useContext } from 'react'
import { Title } from '../../atoms'
import { CommentIcon } from '../../atoms/icon'
import { Comment, FormComment } from '../../molecules'
import { CommentContext } from '../../../firebase/contexts/CommentContext'

export const Comments = memo((): JSX.Element => {
  const {
    commentsCounter,
    handlerCreateComment
  } = useContext(CommentContext)

  return (
    <section className="mt-8 border-t border-slate-200 dark:border-slate-800
    flex flex-col gap-4">

      <header>
        <Title className="text-xl md:text-3xl mt-8 flex items-center gap-1 relative after:grid
          after:place-content-center after:content-[attr(aria-details)] after:h-4 after:w-5
          after:rounded-full after:bg-azure-radiance-700 after:text-white after:text-xs
          after:font-medium"
          ariaDetails={commentsCounter.toString()}>
          <CommentIcon className='w-6 h-6 md:w-10 md:h-10 text-azure-radiance-700' />
          Comments
        </Title>
      </header>

      <FormComment formMode='comment' commentAction={handlerCreateComment} />

      <Comment />
    </section>
  )
})

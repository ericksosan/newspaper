import { useContext } from 'react'
import { CardComment } from '.'
import { SkeletonCardComment } from '../../organisms'
import { CommentContext } from '../../../firebase/contexts/CommentContext'
import { Button } from '../../atoms'
import { ArrowDownIcon } from '../../atoms/icon'

export const Comment = (): JSX.Element => {
  const {
    comments,
    isLoading,
    totalComments,
    parentComments,
    isCommentLoading,
    nextCommentsLoading,
    getReplies,
    fetchMoreComments,
    getCommentUserDetails
  } = useContext(CommentContext)

  const hasComments = (totalComments === 0 && comments.length === 0)
  const hasMoreComments = (totalComments !== 0 && totalComments > 5 && comments.length !== totalComments)

  return (
    <section>
      <div className='flex flex-col divide-y-[1px] md:divide-y-2 dark:divide-slate-700'>
        {isCommentLoading && <SkeletonCardComment />}

        {
          isLoading
            ? Array(5).fill('').map((_item, i) => (<SkeletonCardComment key={i} />))
            : parentComments.length > 0 && parentComments.map((comment) => (
              <CardComment
                key={comment.id}
                comment={comment}
                comments={comments}
                replies={getReplies(comment.id)}
                userDetails={getCommentUserDetails(comment.userId)}
              />
            ))
        }

        {
          nextCommentsLoading && Array(5).fill('').map((_item, i) => (<SkeletonCardComment key={i} />))
        }

      </div>

      <footer className='w-full flex items-center justify-center py-4'>
        {
          hasComments &&
          <small className='text-xs md:text-sm text-slate-900 dark:text-white font-inter'>
            No comment yet, be the first to comment.
          </small>
        }

        {
          hasMoreComments &&
          <Button onClick={fetchMoreComments}
            className='text-xs md:text-sm flex items-center gap-x-0.5 p-0 px-2
            py-1 rounded-full font-inter font-normal'
            colors='dark'>
            More comments
            <ArrowDownIcon />
          </Button>
        }
      </footer>
    </section>
  )
}

import { twMerge } from 'tailwind-merge'
import { CardComment } from '.'
import { type Comment } from '../../../firebase/database/comments'
import { Button } from '../../atoms'
import { CommentMinusIcon, CommentPlusIcon } from '../../atoms/icon'
import { useContext } from 'react'
import { CommentContext } from '../../../firebase/contexts/CommentContext'

interface RepliesProps {
  replies: Comment[]
  isReplyOpen: boolean
  handlerIsReplyOpen: (value: boolean) => void
}

export const Replies: React.FC<RepliesProps> = ({ replies, isReplyOpen, handlerIsReplyOpen }) => {
  const { getReplies, getCommentUserDetails } = useContext(CommentContext)
  const lengthReplies = replies.length

  return (
    <div className="py-4 flex flex-col relative">
      {
        lengthReplies > 0 && <div className="relative">
          <div className="border-slate-300 dark:border-slate-700 top-0 bottom-0
              absolute w-full border-t-[1px] md:border-t-2 -translate-x-full translate-y-1/2" />

          <Button
            onClick={() => { handlerIsReplyOpen(!isReplyOpen) }}
            colors='dark'
            className={
              twMerge(
                `self-start rounded-full p-0 text-xs w-auto h-5 flex items-center
                gap-x-1 dark:bg-slate-700 px-1.5 font-normal border-slate-300
              dark:border-slate-700`,
                isReplyOpen && 'rounded-es-sm'
              )}>
            {
              isReplyOpen
                ? <CommentMinusIcon />
                : <CommentPlusIcon />
            }
            {
              (!isReplyOpen && lengthReplies > 0) &&
              `${lengthReplies} replies`
            }
          </Button>
        </div>
      }

      {
        isReplyOpen &&
        (
          lengthReplies > 0 &&
          replies.map((reply) => (
            <CardComment
              key={reply.id}
              comments={[]}
              comment={reply}
              replies={getReplies(reply.id)}
              userDetails={getCommentUserDetails(reply.userId)}
            />
          ))
        )
      }

    </div>
  )
}

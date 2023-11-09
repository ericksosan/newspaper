import { memo } from 'react'
import { Avatar, CommentsControls, FormComment, Replies } from '..'
import { type Comment } from '../../../firebase/database/comments'
import { markdownParser } from '../../../utils'
import { type ShortUserDetails } from '../../../firebase/contexts/CommentContext'
import { ModalConfirmChanges } from '../../organisms'
import { useCardComments } from '../../../hooks'

interface CommentProps {
  comment: Comment
  replies: Comment[]
  comments: Comment[]
  userDetails: ShortUserDetails
}

export const CardComment: React.FC<CommentProps> = memo(({ comment, replies, userDetails }) => {
  const { body, userId, modifiedAt } = comment

  const {
    newspaper,
    isEditing,
    isReplying,
    isReplyOpen,
    isModalOpen,
    totalRepliesToDelete,
    commentElapsedTimeCreating,
    commentElapsedTimeModification,
    handlerToggleModal,
    onCreateReply,
    onRemoveComment,
    onEditComment,
    handleConfirmChanges,
    handlerIsReplying,
    handlerIsEditing,
    handlerIsReplyOpen
  } = useCardComments({ comment })

  return (
    <div className="pt-4 flex flex-col font-inter px-1.5 border-l-[1px]
    animate-fade animate-duration-300 animate-ease-linear md:px-4
    md:border-l-2 border-slate-300 dark:border-slate-700 overflow-hidden">

      <div className='flex gap-2 items-center relative'>
        <div className="border-slate-300 dark:border-slate-700 absolute w-full
        border-t-[1px] md:border-t-2 -translate-x-full z-0" />
        <Avatar
          img={userDetails.photoURL}
          alt={`Profile picture of  ${userDetails.fullname ?? ''}`}
          className="w-8 h-8 md:w-10 md:h-10 border-[1px] md:border-2 border-slate-300
          dark:border-slate-700" />
        <div className="flex flex-col font-semibold gap-0.5">
          <div className="flex gap-1 items-center">
            <span className='text-xs md:text-sm dark:text-white'>{userDetails.fullname}</span>
            {
              newspaper.idWritter === userId &&
              <span className="flex items-center text-[10px] font-medium px-1.5 rounded-full select-none
              bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                Author
              </span>
            }
          </div>
          <time className="text-gray-600 dark:text-gray-400 font-normal text-[10px] font-inter">
            {
              modifiedAt
                ? `${commentElapsedTimeCreating} • Edited ${commentElapsedTimeModification}`
                : commentElapsedTimeCreating
            }
          </time>
        </div>
      </div>

      <div className="py-4 font-inter">
        {
          (isEditing)
            ? <FormComment
              formMode="edit"
              bodyEdit={body}
              commentAction={onEditComment} />
            : <div dangerouslySetInnerHTML={{ __html: markdownParser(body) }}
              className="font-inter text-slate-900 dark:text-white text-xs md:text-sm
              prose dark:prose-invert prose-headings:text-lg prose-pre:bg-transparent
              prose-img:rounded-md prose-code:h-auto prose-pre:p-0 prose-code:border
              dark:prose-code:border-slate-700  prose-code:bg-slate-800
              prose-code:rounded-lg" />
        }
      </div>

      {
        isReplying &&
        <FormComment
          formMode="reply"
          commentAction={onCreateReply}
          replyTo={userDetails.fullname ?? ''} />
      }

      <CommentsControls
        userId={userId}
        isEditing={isEditing}
        isReplying={isReplying}
        onRemoveComment={onRemoveComment}
        handlerIsEditing={handlerIsEditing}
        handlerIsReplying={handlerIsReplying}
      />

      {
        replies.length > 0 &&
        <Replies
          replies={replies}
          isReplyOpen={isReplyOpen}
          handlerIsReplyOpen={handlerIsReplyOpen}
        />
      }

      {
        isModalOpen &&
        <ModalConfirmChanges
          handlerCloseModal={handlerToggleModal}
          title={`Are you sure you want to delete this comment, you have a total of (${totalRepliesToDelete}) replies.`}
          handleConfirmChanges={handleConfirmChanges}
        />
      }
    </div >
  )
})

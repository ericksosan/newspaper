import { useAuth } from '../../../firebase/hooks/useAuth'
import { Button } from '../../atoms'
import { CommentIcon, CommentSlashIcon, PencilIcon, PencilOffIcon, TrashIcon } from '../../atoms/icon'

interface CommentsControlsProps {
  userId: string
  isEditing: boolean
  isReplying: boolean
  onRemoveComment: () => void
  handlerIsEditing: (value: boolean) => void
  handlerIsReplying: (value: boolean) => void
}

export const CommentsControls: React.FC<CommentsControlsProps> = (props) => {
  const {
    isEditing, isReplying,
    userId, handlerIsEditing,
    handlerIsReplying, onRemoveComment
  } = props

  const { user } = useAuth()
  const canEdit = (!isReplying && userId === user.id)
  const canDelete = (!isReplying && !isEditing && userId === user.id)

  return (
    <div className='py-2 flex gap-3 [&>button]:self-end [&>button]:font-normal
    [&>button]:p-0 [&>button]:px-3 [&>button]:py-0.5 [&>button]:rounded-full
    [&>button]:flex [&>button]:gap-0.5 [&>button]:items-center [&>button]:justify-center
    [&>button>svg]:w-4 [&>button>svg]:h-4 [&>button]:text-xs [&>button]:md:text-sm'>

      {
        (!isEditing) &&
        <Button
          colors={isReplying ? 'red' : 'blue'}
          onClick={() => { handlerIsReplying(!isReplying) }}>
          {
            (isReplying)
              ? <> <CommentSlashIcon /> Cancel  </>
              : <> <CommentIcon /> Reply  </>
          }
        </Button >
      }

      {
        canEdit &&
        <Button
          colors={isEditing ? 'red' : 'dark'}
          onClick={() => { handlerIsEditing(!isEditing) }}>
          {
            (isEditing)
              ? <> <PencilOffIcon /> Cancel </>
              : <> <PencilIcon /> Edit </>
          }
        </Button >
      }

      {
        canDelete &&
        <Button
          colors='dark'
          onClick={onRemoveComment}>
          <TrashIcon />
          Delete
        </Button >
      }

    </div>
  )
}

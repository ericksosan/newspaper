import { useContext, useState } from 'react'
import { CommentContext } from '../../firebase/contexts/CommentContext'
import { type Comment } from '../../firebase/database/comments'
import { type NewspaperAllDetails } from '../../firebase/database/newspaper'
import { deleteReply } from '../../firebase/database/replies'
import { commentElapsedTime } from '../../utils'

interface UseCardComments {
  isReplying: boolean
  isEditing: boolean
  hasChildren: boolean
  totalRepliesToDelete: number
  openModal: string | undefined
  isReplyOpen: boolean
  newspaper: Pick<NewspaperAllDetails, 'id' | 'idWritter'>
  commentElapsedTimeCreating: string
  commentElapsedTimeModification: string
  onCreateReply: (replyBody: string) => void
  onRemoveComment: () => void
  onEditComment: (body: string) => void
  handleConfirmChanges: () => void
  handlerIsReplying: (value: boolean) => void
  handlerIsEditing: (value: boolean) => void
  handlerIsReplyOpen: (value: boolean) => void
  handleSetOpenModal: (action: string | undefined) => void
}

export const useCardComments = ({ comment }: { comment: Comment }): UseCardComments => {
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [hasChildren, setHasChildren] = useState<boolean>(false)
  const [totalRepliesToDelete, setTotalRepliesToDelete] = useState<number>(0)
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [isReplyOpen, setIsReplyOpen] = useState(false)

  const { id, parentId, createdAt, modifiedAt } = comment

  const {
    newspaper,
    findChildren,
    handlerEditComment,
    handlerEditReply,
    handlerCreateReply,
    handlerRemoveReply,
    handlerRemoveComment
  } = useContext(CommentContext)

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  const onCreateReply = (replyBody: string): void => {
    handlerCreateReply(id, replyBody)
    setIsReplying((prev) => !prev)
    setIsReplyOpen(true)
  }

  const deleteChildren = (listChildren: string[]): void => {
    setHasChildren(true)
    setTotalRepliesToDelete(listChildren.length)
    handleSetOpenModal('pop-up')

    listChildren.forEach((childrenId) => {
      void deleteReply(childrenId)
    })
  }

  const onRemoveComment = (): void => {
    const { hasChildren, listChildren } = findChildren(id)

    if (parentId) {
      if (hasChildren) {
        deleteChildren(listChildren)
        return
      }

      handlerRemoveReply(id)
      return
    }

    if (hasChildren) {
      deleteChildren(listChildren)
      return
    }

    handlerRemoveComment(id)
  }

  const onEditComment = (body: string): void => {
    setIsEditing(false)

    if (parentId) {
      handlerEditReply(id, body)
      return
    }

    handlerEditComment(id, body)
  }

  const handleConfirmChanges = (): void => {
    if (parentId) {
      handlerRemoveReply(id)
      return
    }

    handlerRemoveComment(id)
  }

  const handlerIsReplying = (value: boolean): void => {
    setIsReplying(value)
  }

  const handlerIsEditing = (value: boolean): void => {
    setIsEditing(value)
  }

  const handlerIsReplyOpen = (value: boolean): void => {
    setIsReplyOpen(value)
  }

  const commentElapsedTimeCreating = commentElapsedTime(createdAt)
  const commentElapsedTimeModification = commentElapsedTime(modifiedAt ?? 0).toLowerCase()

  return {
    isReplying,
    isEditing,
    hasChildren,
    totalRepliesToDelete,
    openModal,
    isReplyOpen,
    newspaper,
    commentElapsedTimeCreating,
    commentElapsedTimeModification,
    onCreateReply,
    onRemoveComment,
    onEditComment,
    handleConfirmChanges,
    handlerIsReplying,
    handlerIsEditing,
    handlerIsReplyOpen,
    handleSetOpenModal
  }
}

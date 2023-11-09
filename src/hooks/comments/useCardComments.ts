import { useContext, useState } from 'react'
import { CommentContext } from '../../firebase/contexts/CommentContext'
import { type Comment } from '../../firebase/database/comments'
import { type NewspaperAllDetails } from '../../firebase/database/newspaper'
import { deleteReply } from '../../firebase/database/replies'
import { commentElapsedTime } from '../../utils'
import { useModal } from '..'

interface UseCardComments {
  isReplying: boolean
  isEditing: boolean
  totalRepliesToDelete: number
  isReplyOpen: boolean
  newspaper: Pick<NewspaperAllDetails, 'id' | 'idWritter'>
  commentElapsedTimeCreating: string
  commentElapsedTimeModification: string
  isModalOpen: boolean
  handlerToggleModal: (status: boolean) => void
  onCreateReply: (replyBody: string) => void
  onRemoveComment: () => void
  onEditComment: (body: string) => void
  handleConfirmChanges: () => void
  handlerIsReplying: (value: boolean) => void
  handlerIsEditing: (value: boolean) => void
  handlerIsReplyOpen: (value: boolean) => void
}

export const useCardComments = ({ comment }: { comment: Comment }): UseCardComments => {
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [totalRepliesToDelete, setTotalRepliesToDelete] = useState<number>(0)
  const [isReplyOpen, setIsReplyOpen] = useState(false)
  const { isModalOpen, handlerToggleModal } = useModal()

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

  const onCreateReply = (replyBody: string): void => {
    handlerCreateReply(id, replyBody)
    setIsReplying((prev) => !prev)
    setIsReplyOpen(true)
  }

  const deleteAllComments = (id: string): void => {
    const { listChildren } = findChildren(id)

    handlerToggleModal(false)

    listChildren.forEach((childrenId) => {
      void deleteReply(childrenId)
    })

    if (parentId) {
      handlerRemoveReply(id)
      return
    }

  }

  const onRemoveComment = (): void => {
    const { hasChildren, listChildren } = findChildren(id)

    if (parentId) {
      if (hasChildren) {
        handlerToggleModal(true)
        setTotalRepliesToDelete(listChildren.length)

        return
      }

      handlerRemoveReply(id)
      return
    }

    if (hasChildren) {
      handlerToggleModal(true)
      setTotalRepliesToDelete(listChildren.length)

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
      deleteAllComments(id)
      return
    }

    deleteAllComments(id)
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
    totalRepliesToDelete,
    isReplyOpen,
    newspaper,
    commentElapsedTimeCreating,
    commentElapsedTimeModification,
    isModalOpen,
    handlerToggleModal,
    onCreateReply,
    onRemoveComment,
    onEditComment,
    handleConfirmChanges,
    handlerIsReplying,
    handlerIsEditing,
    handlerIsReplyOpen
  }
}

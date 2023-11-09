import { useEffect, useState } from 'react'
import { type CommentContextValues, CommentContext, type ShortUserDetails, type FindChildren } from './CommentContext'
import { getAllCommentsByNewspaperId, type Comment, createComment, deleteComment, updateComment, getNextComments, getTotalOfComments } from '../database/comments'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../hooks/useAuth'
import { type NewspaperAllDetails } from '../database/newspaper'
import { getUserDetails } from '../database/users'
import toast from 'react-hot-toast'
import { toastOptions } from '../../utils'
import { createReply, deleteReply, getAllRepliesByNewspaperId, getTotalOfReplies, updateReply } from '../database/replies'

interface CommentContextProvider {
  children: React.ReactNode
  newspaper: Pick<NewspaperAllDetails, 'id' | 'idWritter'>
}

export const CommentProvider: React.FC<CommentContextProvider> = ({ children, newspaper }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [replies, setReplies] = useState<Comment[]>([])
  const [userDetails, setUserDetails] = useState<ShortUserDetails>({} as ShortUserDetails)
  const [userDetailsCache, setUserDetailsCache] = useState<ShortUserDetails[]>([])
  const [totalComments, setTotalComments] = useState<number>(0)
  const [commentsCounter, setCommentsCounter] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [nextCommentsLoading, setNextCommentsLoading] = useState<boolean>(false)
  const [isCommentLoading, setIsCommentLoading] = useState<boolean>(false)

  const { user } = useAuth()

  useEffect(() => {
    setIsLoading(true)
    getAllCommentsByNewspaperId(newspaper.id)
      .then((commentsData) => {
        setComments(commentsData)

        getAllRepliesByNewspaperId(newspaper.id)
          .then(setReplies)
          .catch(() => { })
      })
      .catch(() => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  const handlerCounters = async (): Promise<void> => {
    try {
      const sizeComments = await getTotalOfComments(newspaper.id)
      const sizeReplies = await getTotalOfReplies(newspaper.id)

      setTotalComments(sizeComments)
      setCommentsCounter(sizeComments + sizeReplies)
    } catch (error) { }
  }

  useEffect(() => {
    void handlerCounters()
  }, [comments, replies])

  const parentComments = comments.filter((comment) => (comment.parentId === null))

  const fetchMoreComments = (): void => {
    setNextCommentsLoading(true)
    getNextComments(newspaper.id)
      .then((nextComments) => {
        setComments((prev) => [...prev, ...nextComments])
      })
      .catch(_err => { })
      .finally(() => { setNextCommentsLoading(false) })
  }

  const getCommentUserDetails = (userId: string): ShortUserDetails => {
    const isUserCache = userDetailsCache.find((userCache) => userCache.id === userId)

    if (isUserCache) {
      return isUserCache
    }

    getUserDetails(userId)
      .then(user => {
        if (user) {
          setUserDetails(user as ShortUserDetails)
          setUserDetailsCache(prev => [...prev, user as ShortUserDetails])
        }
      })
      .catch(_err => { })

    return userDetails
  }

  const getReplies = (parentId: string): Comment[] => {
    return replies.filter((reply) => (reply.parentId === parentId))
      .sort((a, b) => (b.createdAt - a.createdAt))
  }

  const findChildren = (parentId: string, listChildren: string[] = []): FindChildren => {
    let hasChildren: boolean = false

    replies.forEach((reply) => {
      if (reply.parentId === parentId) {
        listChildren.push(reply.id)
        findChildren(reply.id, listChildren)
        hasChildren = true
      }
    })

    return { hasChildren, listChildren }
  }

  /** Internal utilities Methods */
  const handlerComment = (comment: Comment): void => {
    setComments(prev => [comment, ...prev])
  }

  const handlerReplies = (reply: Comment): void => {
    setReplies(prev => [reply, ...prev])
  }

  const removeComment = (commentId: string, commentList: Comment[]): Comment[] => {
    return commentList.filter((comment) => comment.id !== commentId)
  }

  const editComment = (commentId: string, body: string, commentList: Comment[]): Comment[] => {
    return commentList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          body,
          modifiedAt: Date.now()
        }
      }

      return comment
    })
  }

  /** Method Root or Parent Comments */
  const handlerCreateComment = (body: string): void => {
    const newComment: Comment = {
      body,
      parentId: null,
      id: uuidv4(),
      userId: user.id,
      modifiedAt: null,
      createdAt: Date.now(),
      newspaperId: newspaper.id
    }

    setIsCommentLoading(true)
    void toast.promise(
      createComment(newComment),
      {
        loading: 'Commenting...',
        success: () => {
          handlerComment(newComment)
          setIsCommentLoading(false)
          return 'Comment posted.'
        },
        error: () => 'An error occurred while posting the comment.'
      }, toastOptions
    )
  }

  const handlerRemoveComment = (id: string): void => {
    void toast.promise(
      deleteComment(id),
      {
        loading: 'Deleting...',
        success: () => {
          setComments(prev => removeComment(id, prev))
          return 'Comment deleted.'
        },
        error: () => 'An error occurred while deleting the comment.'
      }, toastOptions
    )
  }

  const handlerEditComment = (id: string, body: string): void => {
    void toast.promise(
      updateComment(id, body),
      {
        loading: 'Updating...',
        success: () => {
          setComments(prev => editComment(id, body, prev))
          return 'Comment updated.'
        },
        error: () => 'An error occurred while Updating the comment.'
      }, toastOptions
    )
  }

  /** Method Children or Nested Comments */
  const handlerCreateReply = (parentId: string, body: string): void => {
    const newReply: Comment = {
      body,
      parentId,
      id: uuidv4(),
      userId: user.id,
      modifiedAt: null,
      createdAt: Date.now(),
      newspaperId: newspaper.id
    }

    void toast.promise(
      createReply(newReply),
      {
        loading: 'Replying...',
        success: () => {
          handlerReplies(newReply)
          return 'Reply posted.'
        },
        error: () => 'An error occurred while posting the reply.'
      }, toastOptions
    )
  }

  const handlerRemoveReply = (id: string): void => {
    void toast.promise(
      deleteReply(id),
      {
        loading: 'Deleting...',
        success: () => {
          setReplies(prev => removeComment(id, prev))
          return 'Reply deleted.'
        },
        error: () => 'An error occurred while deleting the reply.'
      }, toastOptions
    )
  }

  const handlerEditReply = (id: string, body: string): void => {
    void toast.promise(
      updateReply(id, body),
      {
        loading: 'Updating...',
        success: () => {
          setReplies(prev => editComment(id, body, prev))
          return 'Reply updated.'
        },
        error: () => 'An error occurred while updating the reply.'
      }, toastOptions
    )
  }

  const commentValues: CommentContextValues = {
    comments,
    isLoading,
    newspaper,
    userDetails,
    totalComments,
    parentComments,
    commentsCounter,
    nextCommentsLoading,
    isCommentLoading,

    getReplies,
    findChildren,
    handlerComment,
    handlerEditReply,
    fetchMoreComments,
    handlerCreateReply,
    handlerRemoveReply,
    handlerEditComment,
    handlerCreateComment,
    handlerRemoveComment,
    getCommentUserDetails
  }

  return (
    <CommentContext.Provider value={commentValues}>
      {children}
    </CommentContext.Provider>
  )
}

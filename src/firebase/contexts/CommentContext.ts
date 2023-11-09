import { createContext } from 'react'
import { type Comment } from '../database/comments'
import { type NewspaperAllDetails } from '../database/newspaper'
import { type UserDetails } from '../database/users'

export type ShortUserDetails = Pick<UserDetails, 'id' | 'fullname' | 'photoURL'>

export interface FindChildren {
  hasChildren: boolean
  listChildren: string[]
}

export interface CommentContextValues {
  isLoading: boolean
  comments: Comment[]
  totalComments: number
  commentsCounter: number
  nextCommentsLoading: boolean
  isCommentLoading: boolean
  userDetails: ShortUserDetails
  parentComments: Comment[]
  newspaper: Pick<NewspaperAllDetails, 'id' | 'idWritter'>
  fetchMoreComments: () => void
  handlerComment: (comment: Comment) => void
  getReplies: (parentId: string) => Comment[]
  findChildren: (parentId: string, listChildren?: string[]) => FindChildren
  getCommentUserDetails: (userId: string) => ShortUserDetails
  /** Root or Parent Comments */
  handlerCreateComment: (body: string) => void
  handlerRemoveComment: (id: string) => void
  handlerEditComment: (id: string, body: string) => void
  /** Children or Nested Comments */
  handlerCreateReply: (parentId: string, body: string) => void
  handlerRemoveReply: (id: string) => void
  handlerEditReply: (id: string, body: string) => void
}

export const CommentContext = createContext<CommentContextValues>({} as CommentContextValues)

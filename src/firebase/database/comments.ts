import { getDocs, query, where, collection, limit, startAfter, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from '../firebase.config'

export interface Comment {
  id: string
  body: string
  userId: string
  createdAt: number
  newspaperId: string
  parentId: string | null
  modifiedAt: number | null
}

const limitComments = 5
let lastComment: QueryDocumentSnapshot<DocumentData, DocumentData> | null = null

// --------------- Get All Comments By NewspaperId --------------- //

export const getAllCommentsByNewspaperId = async (newspaperId: string): Promise<Comment[]> => {
  const queryComment = query(
    collection(db, 'comments'),
    where('newspaperId', '==', newspaperId),
    limit(limitComments)
  )

  const commentsResult = (await getDocs(queryComment)).docs

  lastComment = commentsResult[commentsResult.length - 1]

  return commentsResult.map((comment) => {
    return comment.data() as Comment
  }).sort((a, b) => b.createdAt - a.createdAt)
}

// --------------- Get Next Comments --------------- //

export const getNextComments = async (newspaperId: string): Promise<Comment[]> => {
  const queryComment = query(
    collection(db, 'comments'),
    where('newspaperId', '==', newspaperId),
    startAfter(lastComment),
    limit(limitComments)
  )

  const commentsResult = (await getDocs(queryComment)).docs

  lastComment = commentsResult[commentsResult.length - 1]

  return commentsResult.map((comment) => {
    return comment.data() as Comment
  }).sort((a, b) => b.createdAt - a.createdAt)
}

// --------------- Get Total Comments --------------- //

export const getTotalOfComments = async (newspaperId: string): Promise<number> => {
  const queryComment = query(
    collection(db, 'comments'),
    where('newspaperId', '==', newspaperId)
  )

  return (await getDocs(queryComment)).size
}

// --------------- Create Comment --------------- //

export const createComment = async (comment: Comment): Promise<void> => {
  const docRef = doc(db, `comments/${comment.id}`)

  await setDoc(docRef, comment)
}

// --------------- Delete Comment --------------- //

export const deleteComment = async (id: string): Promise<void> => {
  const docRef = doc(db, `comments/${id}`)

  await deleteDoc(docRef)
}

// --------------- Update Comment --------------- //

export const updateComment = async (id: string, body: string): Promise<void> => {
  const docRef = doc(db, `comments/${id}`)

  await updateDoc(docRef, { body, modifiedAt: Date.now() })
}

import { getDocs, query, where, collection, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { type Comment } from './comments'

// --------------- Get All Replies By NewspaperId --------------- //

export const getAllRepliesByNewspaperId = async (newspaperId: string): Promise<Comment[]> => {
  const queryReplies = query(
    collection(db, 'replies'),
    where('newspaperId', '==', newspaperId)
  )

  const repliesResult = (await getDocs(queryReplies)).docs

  return repliesResult.map((reply) => {
    return reply.data() as Comment
  }).sort((a, b) => b.createdAt - a.createdAt)
}

// --------------- Get Total Replies --------------- //

export const getTotalOfReplies = async (newspaperId: string): Promise<number> => {
  const queryReplies = query(
    collection(db, 'replies'),
    where('newspaperId', '==', newspaperId)
  )

  return (await getDocs(queryReplies)).size
}

// --------------- Create Reply --------------- //

export const createReply = async (reply: Comment): Promise<void> => {
  const docRef = doc(db, `replies/${reply.id}`)

  await setDoc(docRef, reply)
}

// --------------- Delete Reply --------------- //

export const deleteReply = async (id: string): Promise<void> => {
  const docRef = doc(db, `replies/${id}`)

  await deleteDoc(docRef)
}

// --------------- Update Reply --------------- //

export const updateReply = async (id: string, body: string): Promise<void> => {
  const docRef = doc(db, `replies/${id}`)

  await updateDoc(docRef, { body, modifiedAt: Date.now() })
}

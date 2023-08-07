import { type DocumentData, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'

export interface UserDetails {
  id: string
  firstname: string | null
  lastname: string | null
  username: string | null
  photoURL: string | null
  email: string | null
  isAdmin: boolean
  fullname: string | null
}

export const createUser = async (data: UserDetails): Promise<void> => {
  const docRef = doc(db, `users/${data.id}`)

  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    await setDoc(docRef, data)
  }
}

export const getUserDetails = async (id: string): Promise<DocumentData | undefined> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return undefined
}

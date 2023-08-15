import { type DocumentData, doc, setDoc, getDoc, updateDoc, getDocs, collection } from 'firebase/firestore'
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

export const getAllUsers = async (): Promise<UserDetails[]> => {
  const querySnapshot = await getDocs(collection(db, 'users'))

  const users: UserDetails[] = querySnapshot.docs.map((doc) => {
    return doc.data() as UserDetails
  })

  return users
}

export const getUserDetails = async (id: string): Promise<DocumentData | undefined> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return undefined
}

export const createUser = async (data: UserDetails): Promise<void> => {
  const docRef = doc(db, `users/${data.id}`)

  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    await setDoc(docRef, data)
  }
}

export const updateUsername = async (id: string, username: string): Promise<void> => {
  const docRef = doc(db, 'users', id)
  username = username.toLowerCase()
  await updateDoc(docRef, { username })
}

export const updateRole = async (id: string, isAdmin: boolean): Promise<void> => {
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, { isAdmin })
}

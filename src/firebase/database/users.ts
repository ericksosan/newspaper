import { doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { db } from '../firebase.config'
import { updateNewspaperWritter } from './newspaper'

export type UserRoles = 'reader' | 'editor' | 'admin'
export interface UserDetails {
  id: string
  firstname: string | null
  lastname: string | null
  username: string | null
  photoURL: string | null
  email: string | null
  fullname: string | null
  role: UserRoles
  providerId: string
}

// --------------- Get all users --------------- //

/**
 * The function `getAllUsers` retrieves all user details from a Firestore
 * collection, excluding those with the role of "admin".
 * @returns The function `getAllUsers` returns a Promise that resolves to an array
 * of `UserDetails` objects.
 */
export const getAllUsers = async (): Promise<UserDetails[]> => {
  const queryRef = query(collection(db, 'users'), where('role', '!=', 'admin'))
  const querySnapshot = await getDocs(queryRef)

  const users: UserDetails[] = querySnapshot.docs.map((doc) => {
    return doc.data() as UserDetails
  })

  return users
}

// --------------- Get user details --------------- //

/**
 * The function `getUserDetails` retrieves user details from a Firestore database
 * based on the provided ID.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of a user.
 * @returns The function `getUserDetails` returns a `Promise` that resolves to
 * either a `DocumentData` object or `undefined`.
 */
export const getUserDetails = async (id: string): Promise<DocumentData | undefined> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return undefined
}

// --------------- Create user --------------- //

/**
 * The function `createUser` creates a new user document in a Firestore database if
 * it does not already exist.
 * @param {UserDetails} data - The `data` parameter is of type `UserDetails`, which
 * represents the details of a user. It contains properties such as `id`, `name`,
 * `email`, etc.
 */
export const createUser = async (data: UserDetails): Promise<void> => {
  const docRef = doc(db, `users/${data.id}`)

  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) {
    await setDoc(docRef, data)
  }
}

// --------------- Update Username --------------- //

/**
 * The function `updateUsername` updates the username of a user in a database.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of the user whose username needs to be updated.
 * @param {string} username - The `username` parameter is a string that represents
 * the new username that you want to update for a user.
 */
export const updateUsername = async (id: string, username: string): Promise<void> => {
  const docRef = doc(db, 'users', id)
  username = username.toLowerCase()
  await updateDoc(docRef, { username })
}

// --------------- Update Role --------------- //

/**
 * The `updateRole` function updates the `isAdmin` property of a user document in a
 * Firestore database.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of the user whose role needs to be updated.
 * @param {boolean} isAdmin - The `isAdmin` parameter is a boolean value that
 * indicates whether the user should be assigned the admin role or not. If
 * `isAdmin` is `true`, it means the user should be assigned the admin role. If
 * `isAdmin` is `false`, it means the user should not be assigned the admin
 */
export const updateRole = async (id: string, newRole: string): Promise<void> => {
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, { role: newRole })
}

/**
 * The function `updateFullName` updates the full name of a user in a database
 * document.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of the user whose full name needs to be updated.
 * @param data - The `data` parameter is an object that contains two properties:
 * `firstname` and `lastname`. These properties represent the first name and last
 * name of a user.
 */
export const updateFullName = async (id: string, data: { firstname: string, lastname: string }): Promise<void> => {
  const fullname = `${data.firstname} ${data.lastname}`
  const docRef = doc(db, 'users', id)
  await updateDoc(docRef, { ...data, fullname })
  await updateNewspaperWritter(id, fullname)
}

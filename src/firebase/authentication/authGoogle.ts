import { GoogleAuthProvider, type UserCredential, signInWithPopup } from 'firebase/auth'
import { generateUsername } from 'unique-username-generator'
import { auth } from '../firebase.config'
import { createUser, type UserDetails } from '../database/users'

export const authSignInWithGoogle = async (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, googleProvider)
  const { uid, photoURL, displayName, email } = userCredential.user

  const username = generateUsername()

  const user: UserDetails = {
    email,
    id: uid,
    firstname: '',
    lastname: '',
    photoURL,
    isAdmin: false,
    username,
    fullname: displayName
  }

  await createUser(user)

  return userCredential
}

import { GoogleAuthProvider, type UserCredential, signInWithPopup, type UserInfo } from 'firebase/auth'
import { generateUsername } from 'unique-username-generator'
import { auth } from '../firebase.config'
import { createUser, type UserDetails } from '../database/users'

export const authSignInWithGoogle = async (): Promise<UserCredential> => {
  const googleProvider = new GoogleAuthProvider()
  const userCredential = await signInWithPopup(auth, googleProvider)
  const { uid, displayName, email } = userCredential.user

  let providerInfo: UserInfo = {} as UserInfo

  userCredential.user.providerData.forEach((profile) => {
    providerInfo = profile
  })

  const { providerId, photoURL } = providerInfo

  const username = generateUsername()

  const user: UserDetails = {
    email,
    id: uid,
    firstname: '',
    lastname: '',
    username,
    fullname: displayName,
    providerId,
    photoURL,
    role: 'reader'
  }

  await createUser(user)

  return userCredential
}

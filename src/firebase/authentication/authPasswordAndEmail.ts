import { type UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, type UserInfo } from 'firebase/auth'
import { auth } from '../firebase.config'
import type { FormInputs, FormInputsSignup } from '../../types'
import { type UserDetails, createUser } from '../database/users'

export const authSignUp = async (data: FormInputsSignup): Promise<UserCredential> => {
  const { email, password, firstname, lastname, username } = data
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = userCredential.user

  let providerInfo: UserInfo = {} as UserInfo

  userCredential.user.providerData.forEach((profile) => {
    providerInfo = profile
  })

  const { providerId } = providerInfo

  const user: UserDetails = {
    email,
    id: uid,
    firstname,
    lastname,
    providerId,
    photoURL: null,
    username: username.toLocaleLowerCase(),
    fullname: `${firstname} ${lastname}`,
    role: 'reader'
  }

  try {
    await createUser(user)
  } catch (err) { }

  return userCredential
}

export const authSignIn = async (data: FormInputs): Promise<UserCredential> => {
  const { email, password } = data
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  return userCredential
}

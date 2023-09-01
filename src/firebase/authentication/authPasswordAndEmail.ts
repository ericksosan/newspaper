import { type UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { AvatarGenerator } from 'random-avatar-generator'
import { auth } from '../firebase.config'
import type { FormInputs, FormInputsSignup } from '../../types'
import { type UserDetails, createUser } from '../database/users'

export const authSignUp = async (data: FormInputsSignup): Promise<UserCredential> => {
  const { email, password, firstname, lastname, username } = data
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const { uid } = userCredential.user
  const generator = new AvatarGenerator()

  const user: UserDetails = {
    email,
    id: uid,
    firstname,
    lastname,
    photoURL: generator.generateRandomAvatar(),
    isAdmin: false,
    username: username.toLocaleLowerCase(),
    fullname: `${firstname} ${lastname}`
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

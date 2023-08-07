import { signOut } from 'firebase/auth'
import { auth } from '../firebase.config'

export const logout = async (): Promise<void> => {
  await signOut(auth)
}

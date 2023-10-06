import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase.config'

export const userResetPasswordWithEmail = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
}

import type { FormInputsChangePassword } from '../../types'
import { auth } from '../firebase.config'
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'

export const userChangePassword = async (data: FormInputsChangePassword): Promise<void> => {
  const { oldPassword, newPassword } = data
  if (auth.currentUser === null) return
  const user = auth.currentUser
  const credentials = EmailAuthProvider.credential(user.email ?? '', oldPassword)
  const userCredential = await reauthenticateWithCredential(user, credentials)

  if (userCredential) {
    await updatePassword(user, newPassword)
  }
}

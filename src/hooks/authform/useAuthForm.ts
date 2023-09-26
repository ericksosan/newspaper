import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler } from 'react-hook-form'
import { authSignIn, authSignInWithGoogle, authSignUp, userResetPasswordWithEmail } from '../../firebase/authentication'
import { useAuth } from '../../firebase/hooks/useAuth'
import type { FormInputResetPassword, FormInputs, FormInputsSignup } from '../../types'
import toast from 'react-hot-toast'
import { toastOptions } from '../../utils'

interface UseAuthForm {
  message: string
  isLoading: {
    emailProv: boolean
    googleProv: boolean
  }
  showModalMessage: boolean
  handleReplyOfModalMessage: () => void
  onSubmitLogin: SubmitHandler<FormInputs>
  onSubmitSignUp: SubmitHandler<FormInputsSignup>
  onSubmitResetPassword: SubmitHandler<FormInputResetPassword>
  handleSignInWithGoogle: () => Promise<void>
}

export const useAuthForm = (): UseAuthForm => {
  const [isLoading, setIsLoading] = useState({ emailProv: false, googleProv: false })
  const [message, setMessage] = useState('')
  const [showModalMessage, setShowModalMessage] = useState(false)
  const { handleGetUserData } = useAuth()
  const navigate = useNavigate()

  const onSubmitLogin: SubmitHandler<FormInputs> = async (data): Promise<void> => {
    try {
      setIsLoading({ ...isLoading, emailProv: true })
      const userCredentials = await authSignIn(data)
      await handleGetUserData(userCredentials.user.uid)
      setIsLoading({ ...isLoading, emailProv: false })
      navigate('/', { replace: true })
    } catch (err) {
      setMessage('Wrong password or email')
      setIsLoading({ ...isLoading, emailProv: false })
    }
  }

  const onSubmitSignUp: SubmitHandler<FormInputsSignup> = async (data): Promise<void> => {
    try {
      setIsLoading({ ...isLoading, emailProv: true })
      const userCredentials = await authSignUp(data)
      await handleGetUserData(userCredentials.user.uid)
      navigate('/')
      setIsLoading({ ...isLoading, emailProv: false })
    } catch (err) {
      setIsLoading({ ...isLoading, emailProv: false })
      setMessage('This email is not available')
    }
  }

  const onSubmitResetPassword: SubmitHandler<FormInputResetPassword> = async ({ email }): Promise<void> => {
    void toast.promise(
      userResetPasswordWithEmail(email),
      {
        loading: 'Loading...',
        success: () => {
          setShowModalMessage(true)
          return 'Email sent successfully!'
        },
        error: (_err) => 'There is no existing user record corresponding to the provided identifier.'
      },
      toastOptions
    )
  }

  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading({ ...isLoading, googleProv: true })
      const userCredentials = await authSignInWithGoogle()
      await handleGetUserData(userCredentials.user.uid)
      navigate('/')
      setIsLoading({ ...isLoading, googleProv: false })
    } catch (error) {
      setIsLoading({ ...isLoading, googleProv: false })
    }
  }

  const handleReplyOfModalMessage = (): void => {
    setShowModalMessage(!showModalMessage)
    navigate('/', { replace: true })
  }

  return {
    message,
    isLoading,
    onSubmitLogin,
    onSubmitSignUp,
    showModalMessage,
    onSubmitResetPassword,
    handleReplyOfModalMessage,
    handleSignInWithGoogle
  }
}

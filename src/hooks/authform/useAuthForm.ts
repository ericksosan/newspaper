import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { authSignIn, authSignInWithGoogle, authSignUp } from '../../firebase/authentication'
import { useAuth } from '../../firebase/hooks/useAuth'
import type { FormInputs, FormInputsSignup } from '../../types'

interface UseAuthForm {
  message: string
  isLoading: {
    emailProv: boolean
    googleProv: boolean
  }
  onSubmitLogin: SubmitHandler<FormInputs>
  onSubmitSignUp: SubmitHandler<FormInputsSignup>
  handleSignInWithGoogle: () => Promise<void>
}

export const useAuthForm = (): UseAuthForm => {
  const [isLoading, setIsLoading] = useState({ emailProv: false, googleProv: false })
  const [message, setMessage] = useState('')
  const { handleGetUserData } = useAuth()
  const navigate = useNavigate()

  const { reset } = useForm<FormInputs>()

  const onSubmitLogin: SubmitHandler<FormInputs> = async (data): Promise<void> => {
    try {
      setIsLoading({ ...isLoading, emailProv: true })
      const userCredentials = await authSignIn(data)
      await handleGetUserData(userCredentials.user.uid)
      setIsLoading({ ...isLoading, emailProv: false })
      navigate('/', { replace: true })
      reset()
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
      reset()
    } catch (err) {
      setIsLoading({ ...isLoading, emailProv: false })
      setMessage('This email is not available')
    }
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

  return {
    message,
    isLoading,
    onSubmitLogin,
    onSubmitSignUp,
    handleSignInWithGoogle
  }
}

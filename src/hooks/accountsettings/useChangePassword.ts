import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { FormInputsChangePassword, Alert } from '../../types'
import { logout, userChangePassword } from '../../firebase/authentication'

interface UseChangePassword {
  isLoading: boolean
  alert: Alert
  onSubmitChangePassword: SubmitHandler<FormInputsChangePassword>
}

export const useChangePassword = (): UseChangePassword => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [alert, setAlert] = useState<Alert>({ } as Alert)
  const { reset } = useForm()

  const onSubmitChangePassword: SubmitHandler<FormInputsChangePassword> = async (data): Promise<void> => {
    try {
      setIsLoading(true)
      await userChangePassword(data)
      await logout()
      reset()
    } catch (err) {
      setIsLoading(false)
      setAlert({ code: 'error', message: 'Invalid password' })
    }
  }

  return {
    isLoading,
    alert,
    onSubmitChangePassword
  }
}

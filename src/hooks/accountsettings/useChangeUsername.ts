import { useState } from 'react'
import type { Alert, FormInputChangeUsername } from '../../types'
import { useForm, type SubmitHandler, type UseFormReset } from 'react-hook-form'
import { useAuth } from '../../firebase/hooks/useAuth'
import { updateUsername } from '../../firebase/database/users'

interface UseChangeUsername {
  isLoading: boolean
  openModal: string | undefined
  alert: Alert
  onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername>
  handleUpdateUsername: () => Promise<void>
  handleSetOpenModal: (action: string | undefined) => void
}

export const useChangeUsername = (reset: UseFormReset<FormInputChangeUsername>): UseChangeUsername => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [username, setUsername] = useState<string>('')
  const [alert, setAlert] = useState<Alert>({} as Alert)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { formState: { isValid } } = useForm<FormInputChangeUsername>()
  const { user, handleChangeUsername } = useAuth()

  const onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername> = (data) => {
    if (isValid) {
      setUsername(data.newUsername)
      handleSetOpenModal('pop-up')
    }
  }

  const handleUpdateUsername = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await updateUsername(user.id, username)
      handleChangeUsername(username)
      handleSetOpenModal(undefined)
      reset()
      setIsLoading(false)
      setAlert({ code: 'success', message: 'Your username was changed' })
    } catch (err) {
      setAlert({ code: 'error', message: 'Your username wasn\'t changed' })
    }
  }

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  return {
    alert,
    isLoading,
    openModal,
    onSubmitChangeUsername,
    handleUpdateUsername,
    handleSetOpenModal
  }
}

import { useState } from 'react'
import type { FormInputChangeUsername } from '../../types'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../firebase/hooks/useAuth'
import { updateUsername } from '../../firebase/database/users'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from '../../utils'
import { useModal } from '..'

interface UseChangeUsername {
  isModalOpen: boolean
  onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername>
  handleUpdateUsername: () => Promise<void>
  handlerToggleModal: (value: boolean) => void
}

export const useChangeUsername = (): UseChangeUsername => {
  const [username, setUsername] = useState<string>('')
  const { formState: { isValid } } = useForm<FormInputChangeUsername>()
  const { user, handleChangeUsername } = useAuth()
  const navigate = useNavigate()
  const { isModalOpen, handlerToggleModal } = useModal()

  const onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername> = (data) => {
    if (isValid) {
      setUsername(data.newUsername)
      handlerToggleModal(true)
    }
  }

  const handleUpdateUsername = async (): Promise<void> => {
    void toast.promise(
      updateUsername(user.id, username),
      {
        loading: 'Changing username...',
        success: (_data) => {
          handleChangeUsername(username)
          handlerToggleModal(false)
          navigate('/', { replace: true })
          return 'Your username has been successfully changed.'
        },
        error: (_err) => 'An error occurred while changing your username.'
      },
      toastOptions
    )
  }

  return {
    isModalOpen,
    handlerToggleModal,
    onSubmitChangeUsername,
    handleUpdateUsername
  }
}

import { useState } from 'react'
import type { FormInputChangeUsername } from '../../types'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAuth } from '../../firebase/hooks/useAuth'
import { updateUsername } from '../../firebase/database/users'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { toastOptions } from '../../utils'

interface UseChangeUsername {
  openModal: string | undefined
  onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername>
  handleUpdateUsername: () => Promise<void>
  handleSetOpenModal: (action: string | undefined) => void
}

export const useChangeUsername = (): UseChangeUsername => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [username, setUsername] = useState<string>('')
  const { formState: { isValid } } = useForm<FormInputChangeUsername>()
  const { user, handleChangeUsername } = useAuth()
  const navigate = useNavigate()

  const onSubmitChangeUsername: SubmitHandler<FormInputChangeUsername> = (data) => {
    if (isValid) {
      setUsername(data.newUsername)
      handleSetOpenModal('pop-up')
    }
  }

  const handleUpdateUsername = async (): Promise<void> => {
    void toast.promise(
      updateUsername(user.id, username),
      {
        loading: 'Changing username...',
        success: (_data) => {
          handleChangeUsername(username)
          handleSetOpenModal(undefined)
          navigate('/', { replace: true })
          return 'Your username has been successfully changed.'
        },
        error: (_err) => 'An error occurred while changing your username.'
      },
      toastOptions
    )
  }

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  return {
    openModal,
    onSubmitChangeUsername,
    handleUpdateUsername,
    handleSetOpenModal
  }
}

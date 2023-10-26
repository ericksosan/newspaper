import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { FormInputChangeFullName } from '../../types'
import toast from 'react-hot-toast'
import { useAuth } from '../../firebase/hooks/useAuth'
import { toastOptions } from '../../utils'
import { updateFullName } from '../../firebase/database/users'
import { useNavigate } from 'react-router-dom'
import { useModal } from '..'

interface UseChangeFullName {
  isModalOpen: boolean
  handlerToggleModal: (status: boolean) => void
  handleUpdateFullName: () => void
  onSubmitChangeFullName: SubmitHandler<FormInputChangeFullName>
}

export const useChangeFullName = (): UseChangeFullName => {
  const [fullName, setFullName] = useState<FormInputChangeFullName>()
  const { formState: { isValid } } = useForm<FormInputChangeFullName>()
  const { user, handleChangeFullName } = useAuth()
  const navigate = useNavigate()
  const { isModalOpen, handlerToggleModal } = useModal()

  const onSubmitChangeFullName: SubmitHandler<FormInputChangeFullName> = (data) => {
    if (isValid) {
      setFullName(data)
      handlerToggleModal(true)
    }
  }

  const handleUpdateFullName = (): void => {
    if (fullName === undefined && fullName !== null) return

    const { firstname, lastname } = fullName

    if (`${firstname} ${lastname}` === user?.fullname) {
      toast.success('Your full name has been successfully changed.', toastOptions)
      handlerToggleModal(false)
      navigate('/', { replace: true })
      return
    }

    void toast.promise(
      updateFullName(user.id, fullName),
      {
        loading: 'Changing full name...',
        success: (_data) => {
          handleChangeFullName(fullName)
          handlerToggleModal(false)
          navigate('/', { replace: true })
          return 'Your full name has been successfully changed.'
        },
        error: (_err) => 'An error occurred while changing your full name.'
      },
      toastOptions
    )
  }

  return {
    isModalOpen,
    handlerToggleModal,
    handleUpdateFullName,
    onSubmitChangeFullName
  }
}

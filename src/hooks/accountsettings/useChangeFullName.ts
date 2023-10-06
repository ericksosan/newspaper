import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type { FormInputChangeFullName } from '../../types'
import toast from 'react-hot-toast'
import { useAuth } from '../../firebase/hooks/useAuth'
import { toastOptions } from '../../utils'
import { updateFullName } from '../../firebase/database/users'
import { useNavigate } from 'react-router-dom'

interface UseChangeFullName {
  openModal: string | undefined
  handleUpdateFullName: () => void
  handleSetOpenModal: (action: string | undefined) => void
  onSubmitChangeFullName: SubmitHandler<FormInputChangeFullName>
}

export const useChangeFullName = (): UseChangeFullName => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [fullName, setFullName] = useState<FormInputChangeFullName>()
  const { formState: { isValid } } = useForm<FormInputChangeFullName>()
  const { user: { id }, handleChangeFullName } = useAuth()
  const navigate = useNavigate()

  const onSubmitChangeFullName: SubmitHandler<FormInputChangeFullName> = (data) => {
    if (isValid) {
      setFullName(data)
      handleSetOpenModal('pop-up')
    }
  }

  const handleUpdateFullName = (): void => {
    if (fullName === undefined) return

    void toast.promise(
      updateFullName(id, fullName),
      {
        loading: 'Changing full name...',
        success: (_data) => {
          handleChangeFullName(fullName)
          handleSetOpenModal(undefined)
          navigate('/', { replace: true })
          return 'Your full name has been successfully changed.'
        },
        error: (_err) => 'An error occurred while changing your full name.'
      },
      toastOptions
    )
  }

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  return {
    openModal,
    handleSetOpenModal,
    handleUpdateFullName,
    onSubmitChangeFullName
  }
}

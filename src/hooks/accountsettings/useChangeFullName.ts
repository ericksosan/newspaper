import { useState } from 'react'
import { type UseFormReset, type SubmitHandler, useForm } from 'react-hook-form'
import type { FormInputChangeFullName } from '../../types'
import toast from 'react-hot-toast'
import { useAuth } from '../../firebase/hooks/useAuth'
import { toastOptions } from '../../utils'
import { updateFullName } from '../../firebase/database/users'

interface UseChangeFullName {
  openModal: string | undefined
  handleUpdateFullName: () => void
  handleSetOpenModal: (action: string | undefined) => void
  onSubmitChangeFullName: SubmitHandler<FormInputChangeFullName>
}

export const useChangeFullName = (reset: UseFormReset<FormInputChangeFullName>): UseChangeFullName => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [fullName, setFullName] = useState<FormInputChangeFullName>()
  const { formState: { isValid } } = useForm<FormInputChangeFullName>()
  const { user: { id }, handleChangeFullName } = useAuth()

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
        loading: 'Saving changes...',
        success: (_data) => {
          handleChangeFullName(fullName)
          handleSetOpenModal(undefined)
          reset()
          return 'Full name was successfully updated.'
        },
        error: (_err) => 'An error occurred while updating the full name.'
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

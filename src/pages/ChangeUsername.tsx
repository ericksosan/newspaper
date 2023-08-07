import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AlertError, AlertSuccess, ConfirmChanges, Input } from '../components'
import { formValidation } from '../utils'
import { updateUsername } from '../firebase/database/users'
import { useAuth } from '../firebase/hooks/useAuth'
import { type MessageAlert } from '../types'

interface FormInputChangeUsername {
  newUsername: string
}

export const ChangeUsername = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<string | undefined>()
  const [username, setUsername] = useState<string>('')
  const [alert, setAlert] = useState<MessageAlert>({ codeAlert: 'none', message: '' })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const methods = useForm<FormInputChangeUsername>()
  const { handleSubmit, reset, formState: { isValid } } = methods
  const { user, handleChangeUsername } = useAuth()

  const onSubmit: SubmitHandler<FormInputChangeUsername> = (data) => {
    if (isValid) {
      setUsername(data.newUsername)
      handleSetOpenModal('pop-up')
      reset()
    }
  }

  const handleUpdateUsername = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await updateUsername(user.id, username)
      handleChangeUsername(username)
      handleSetOpenModal(undefined)
      setIsLoading(false)
      setAlert({ codeAlert: 'success', message: 'Your username was changed' })
    } catch (err) {
      setAlert({ codeAlert: 'error', message: 'Your username wasn\'t changed' })
    }
  }

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">Change Username</h1>
      <div className="p-5 border rounded-md dark:border-slate-700">
        <FormProvider {...methods}>
          <form onSubmit={(evt) => { void handleSubmit(onSubmit)(evt) }}>
            {
              alert.codeAlert === 'success' && <AlertSuccess message={alert.message} />
            }
            {
              alert.codeAlert === 'error' && <AlertError message={alert.message} />
            }
            <Input
              label="New Username"
              name="newUsername"
              placeholder="Enter your new username"
              validation={formValidation.standard}
            />
            <button
              className='w-full bg-azure-radiance-700 hover:bg-azure-radiance-800
              px-3 py-2 rounded-md font-semibold text-white transition-colors duration-300
              ease-in-out'>Change Username</button>
          </form>
          <ConfirmChanges
            isLoading={isLoading}
            handleConfirmChanges={() => { void handleUpdateUsername() }}
            handleSetOpenModal={handleSetOpenModal}
            openModal={openModal}
            title='Are you sure you want to change your username?' />
        </FormProvider>
      </div>
    </div>)
}

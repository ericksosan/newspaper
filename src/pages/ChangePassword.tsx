import { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AlertError, AlertSuccess, Input, Spinner } from '../components'
import { formValidation } from '../utils'
import type { MessageAlert, FormInputsChangePassword } from '../types'
import { logout, userChangePassword } from '../firebase/authentication'

export const ChangePassword = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<MessageAlert>({ codeAlert: 'none', message: '' })
  const methods = useForm<FormInputsChangePassword>()
  const { handleSubmit, reset, watch } = methods

  const onSubmit: SubmitHandler<FormInputsChangePassword> = async (data): Promise<void> => {
    try {
      setIsLoading(true)
      await userChangePassword(data)
      setAlert({ codeAlert: 'success', message: 'Your password was successfully changed' })
      setIsLoading(false)
      await logout()
      reset()
    } catch (err) {
      setIsLoading(false)
      setAlert({ codeAlert: 'error', message: 'Invalid password' })
    }
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10 font-montserrat">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">Change Password</h1>
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
              label="Current Password"
              type='password'
              name="oldPassword"
              placeholder="Enter your old password"
              validation={formValidation.password}
            />
            <Input
              label="New Password"
              type='password'
              name="newPassword"
              placeholder="Enter your new password"
              validation={formValidation.password}
            />
            <Input
              label="Confirm Password"
              type='password'
              name="repassword"
              placeholder="Enter your new password again"
              validation={formValidation.confirmChangePassword(watch)}
            />
            <button
              className='w-full bg-azure-radiance-700 hover:bg-azure-radiance-800
              px-3 py-2 rounded-md font-semibold text-white transition-colors duration-300
              ease-in-out'
            >
              {
                isLoading
                  ? <Spinner />
                  : 'Change Password'
              }
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

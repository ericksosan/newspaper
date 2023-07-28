import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components'
import { formValidation } from '../utils'
import { type FormInputsChangePassword } from '../types'

export const ChangePassword = (): JSX.Element => {
  const methods = useForm<FormInputsChangePassword>()
  const { handleSubmit, reset, watch } = methods

  const onSubmit: SubmitHandler<FormInputsChangePassword> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">Change Password</h1>
      <div className="p-5 border rounded-md dark:border-slate-700">
        <FormProvider {...methods}>
          <form onSubmit={(evt) => { void handleSubmit(onSubmit)(evt) }}>
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
              name="password"
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
            <button className='w-full bg-azure-radiance-700 hover:bg-azure-radiance-800 px-3 py-2 rounded-md font-semibold text-white transition-colors duration-300 ease-in-out'>Change Password</button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

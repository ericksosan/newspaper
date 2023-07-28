import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '../components'
import { formValidation } from '../utils'

interface FormInputChangeUsername {
  newUsername: string
}

export const ChangeUsername = (): JSX.Element => {
  const methods = useForm<FormInputChangeUsername>()
  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<FormInputChangeUsername> = (data) => {
    console.log(data)
    reset()
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">Change Username</h1>
      <div className="p-5 border rounded-md dark:border-slate-700">
        <FormProvider {...methods}>
          <form onSubmit={(evt) => { void handleSubmit(onSubmit)(evt) }}>
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
        </FormProvider>
      </div>
    </div>)
}

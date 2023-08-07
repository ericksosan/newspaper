import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form'
import { formValidation } from '../utils'
import { Spinner, Input, AlertError, SignInUsingGoogle } from '../components'
import { type FormInputsSignup } from '../types'
import { DarkThemeToggle } from '../layouts'
import { authSignUp } from '../firebase/authentication'
import { useAuth } from '../firebase/hooks/useAuth'

export const Signup: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const navigate = useNavigate()
  const { handleGetUserData } = useAuth()
  const methods = useForm<FormInputsSignup>()
  const { handleSubmit, reset, watch } = methods

  const onSubmit: SubmitHandler<FormInputsSignup> = async (data): Promise<void> => {
    try {
      setIsLoading(true)
      const userCredentials = await authSignUp(data)
      await handleGetUserData(userCredentials.user.uid)
      navigate('/')
      setIsLoading(false)
      reset()
    } catch (err) {
      setIsLoading(false)
      setMessage('This email is not available')
    }
  }

  return (
    <section className="flex flex-col">
      <nav className="h-16 w-full flex justify-between items-center px-10">
        <h1 className="inline-block text-xl font-bold select-none text-azure-radiance-700
          dark:text-gray-200">Newspaper</h1>
        <DarkThemeToggle />
      </nav>
      <main className='flex flex-col justify-center items-center z-20
      px-10 lg:flex-row lg:m-auto lg:w-11/12 lg:gap-2 lg:py-10'>
        <div className="flex justify-center items-center lg:w-full">
          <img
            src="/images/signup.svg"
            className='w-56 md:w-full'
            alt=""
          />
        </div>
        <FormProvider {...methods}>
          <form
            className='w-full mb-10 sm:w-3/4 lg:w-full lg:mb-0 xl:w-3/4'
            onSubmit={(evt) => { void handleSubmit(onSubmit)(evt) }}>
            <div className="mb-10 text-center">
              <h1 className='font-bold text-2xl dark:text-gray-200 xl:text-3xl'>Create an account</h1>
              <span className='inline-block text-lg text-gray-600
              dark:text-gray-400 xl:text-xl'>Don&apos;t miss any news highlights.</span>
            </div>
            {message.length > 0 && <AlertError message={message} />}
            <div className="flex justify-between items-center gap-3 ">
              <Input
                label="First name"
                type='text' name="firstname"
                placeholder="Good"
                validation={formValidation.standard}
              />

              <Input
                label="Last name"
                type='text'
                name="lastname"
                placeholder="Luck"
                validation={formValidation.standard}
              />
            </div>

            <Input
              label="Username"
              type='text'
              name="username"
              placeholder="goodluck"
              validation={formValidation.standard}
            />

            <Input
              label="Email address"
              type='text' name="email"
              placeholder="goodluck@gmail.com"
              validation={formValidation.email}
            />

            <Input
              label="Password"
              type='password'
              name="password"
              placeholder="Password"
              validation={formValidation.password}
            />

            <Input
              label="Confirm password"
              type='password'
              name="repassword"
              placeholder="Confirm password"
              validation={formValidation.confirmPassword(watch)}
            />

            <button
              type='submit'
              className="font-semibold bg-azure-radiance-700 w-full py-2
              rounded-md text-white hover:bg-azure-radiance-800 disabled:pointer-events-none
              transition-colors duration-500 ease-in-out disabled:bg-azure-radiance-900
              disabled:border disabled:border-slate-800 flex justify-center items-center"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Sign Up'}
            </button>
            <div className="flex justify-center items-center pt-4 gap-2">
              <span className='font-medium dark:text-gray-200'>Already have an account?</span>
              <Link
                to="/auth/login"
                className='font-bold text-azure-radiance-700 dark:text-gray-200
              hover:text-azure-radiance-800 dark:hover:text-azure-radiance-500
                transition-colors duration-500 ease-in-out'>Log In</Link>
            </div>
            <div className="flex justify-between items-center gap-2 pt-4
              [&>hr]:inline-block [&>hr]:border [&>hr]:w-2/4 [&>hr]:border-slate-200
              [&>hr]:dark:border-slate-800">
              <hr />
              <span className='inline-block font-semibold dark:text-gray-200'>Or</span>
              <hr />
            </div>
            <SignInUsingGoogle/>
          </form>
        </FormProvider>
      </main>
    </section>
  )
}

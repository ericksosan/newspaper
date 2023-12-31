import { useForm, FormProvider } from 'react-hook-form'
import { formValidation } from '../../utils'
import { type FormInputs } from '../../types'
import { Divider, LinkRedirect, SubTitle } from '../atoms'
import { Navbar } from '../organisms'
import { FormAlert, FormCover, FormField, FormHeader, FormRedirect, ButtonLoading } from '../molecules'
import { useAuthForm } from '../../hooks/authform'
import { GoogleIcon } from '../atoms/icon'

const Login = (): JSX.Element => {
  const methods = useForm<FormInputs>()
  const { handleSubmit } = methods

  const { isLoading, message, onSubmitLogin, handleSignInWithGoogle } = useAuthForm()

  return (
    <section className="flex flex-col font-montserrat animate-fade duration-300 ease-in">
      <Navbar />
      <main className='flex flex-col justify-center items-center z-20 px-10
      lg:flex-row lg:m-auto lg:w-11/12 lg:gap-2 lg:py-10'>
        <FormCover
          src="/images/login.svg"
          alt="People reading news"
        />
        <FormProvider {...methods}>
          <form className='w-full mb-10 sm:w-3/4 lg:w-full lg:mb-0 xl:w-3/4 flex
          flex-col'
            onSubmit={handleSubmit(onSubmitLogin)}>

            <FormHeader
              title='Welcome Back'
              subTitle='Enter your login datails below'
            />

            {message.length > 0 && <FormAlert alert={{ message, code: 'error' }} />}

            <FormField
              label="Email address"
              type='text'
              name="email"
              placeholder="goodluck@gmail.com"
              validation={formValidation.email}
            />

            <FormField
              label="Password"
              type='password'
              name="password"
              placeholder="Password"
              validation={formValidation.password}
            />
            <LinkRedirect
              className='self-end block mb-10 font-medium hover:opacity-80
              transition-colors duration-300 ease-in-out'
              to='RESET_PASSWORD'>
              Forgot password?
            </LinkRedirect>

            <ButtonLoading
              color='blue'
              isLoading={isLoading.emailProv}
              type='submit'>
              Log In
            </ButtonLoading>

            <FormRedirect
              goToTitle='Sign Up'
              title='Don&apos;t have an account?'
              to='SIGNUP'
            />

            <div className="flex justify-between items-center gap-2 py-4">
              <Divider />
              <SubTitle className='font-medium'>Or</SubTitle>
              <Divider />
            </div>

            <ButtonLoading
              type='button'
              color='white'
              onClick={handleSignInWithGoogle}
              isLoading={isLoading.googleProv}>
              <GoogleIcon /> Google
            </ButtonLoading>

          </form>
        </FormProvider>
      </main>
    </section>
  )
}

export default Login

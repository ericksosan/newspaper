import { useForm, FormProvider } from 'react-hook-form'
import { formValidation } from '../../utils'
import { type FormInputsSignup } from '../../types'
import { Navbar } from '../organisms'
import { ButtonLoading, FormAlert, FormCover, FormField, FormHeader, FormRedirect } from '../molecules'
import { Divider, SubTitle } from '../atoms'
import { GoogleIcon } from '../atoms/icon'
import { useAuthForm } from '../../hooks/authform'

const Signup = (): JSX.Element => {
  const methods = useForm<FormInputsSignup>()
  const { handleSubmit, watch } = methods

  const { handleSignInWithGoogle, message, isLoading, onSubmitSignUp } = useAuthForm()

  return (
    <section className="flex flex-col font-montserrat">
      <Navbar />
      <main className='flex flex-col justify-center items-center z-20
      px-10 lg:flex-row lg:m-auto lg:w-11/12 lg:gap-2 lg:py-10'>
        <FormCover
          src='/images/signup.svg'
          alt='Man on top of a megaphone'
        />
        <FormProvider {...methods}>
          <form className='w-full mb-10 sm:w-3/4 lg:w-full lg:mb-0 xl:w-3/4'
            onSubmit={handleSubmit(onSubmitSignUp)}>

            <FormHeader
              title='Create an account'
              subTitle='Don&apos;t miss any news highlights.'
            />

            {message.length > 0 && <FormAlert alert={{ message, code: 'error' }} />}

            <div className="flex justify-between gap-3 ">
              <FormField
                label="First name"
                type='text' name="firstname"
                placeholder="Good"
                validation={formValidation.standard}
              />

              <FormField
                label="Last name"
                type='text'
                name="lastname"
                placeholder="Luck"
                validation={formValidation.standard}
              />
            </div>

            <FormField
              label="Username"
              type='text'
              name="username"
              placeholder="goodluck"
              validation={formValidation.username}
            />

            <FormField
              label="Email address"
              type='text' name="email"
              placeholder="goodluck@gmail.com"
              validation={formValidation.email}
            />

            <FormField
              label="Password"
              type='password'
              name="rePassword"
              placeholder="Password"
              validation={formValidation.confirmPassword(watch)}
            />

            <FormField
              label="Confirm password"
              type='password'
              name="password"
              placeholder="Confirm password"
              validation={formValidation.confirmPassword(watch)}
            />

            <ButtonLoading
              isLoading={isLoading.emailProv}
              type='submit'
              color='blue'>
              Sign Up
            </ButtonLoading>

            <FormRedirect
              goToTitle='Log In'
              title='Already have an account?'
              to='LOGIN'
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
export default Signup

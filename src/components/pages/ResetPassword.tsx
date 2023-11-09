import { FormProvider, useForm } from 'react-hook-form'
import { FormField, FormRedirect } from '../molecules'
import type { FormInputResetPassword } from '../../types'
import { Button, SubTitle, Title } from '../atoms'
import { ModalMessage, Navbar } from '../organisms'
import { formValidation } from '../../utils'
import { useAuthForm } from '../../hooks/authform'

const ResetPassword = (): JSX.Element => {
  const { onSubmitResetPassword, handleReplyOfModalMessage, showModalMessage } = useAuthForm()
  const methods = useForm<FormInputResetPassword>()
  const { handleSubmit } = methods

  return (
    <section className="flex flex-col font-montserrat animate-fade duration-300 ease-in">
      <Navbar className='fixed top-0 bg-white dark:bg-slate-900' />

      <main className="flex items-center justify-center min-h-screen w-full p-10
      flex-col lg:flex-row">

        <img
          className='w-auto md:w-1/2'
          src="/images/reset_password.svg"
          alt="security" />

        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitResetPassword)} className='w-full md:w-3/4 flex flex-col'>

              <div className="flex flex-col gap-6">

                <Title className='font-bold text-3xl xl:text-5xl'>
                  Forgot <span className='block'>your password?</span>
                </Title>

                <SubTitle className='block text-slate-500 dark:text-slate-400
                text-sm md:text-base  xl:text-xl mb-4'>
                  Please provide your email for verification.
                </SubTitle>

              </div>

              <FormField
                name='email'
                type='email'
                label='Email'
                placeholder='Enter email'
                validation={formValidation.email}
              />

              <Button
                className='w-full'
                colors='blue'>
                Reset
              </Button>

              <FormRedirect
                title='Return to'
                goToTitle='login'
                to='LOGIN'
              />
            </form>
          </FormProvider>
        </div>
      </main>
      {showModalMessage && <ModalMessage onClick={handleReplyOfModalMessage} />}
    </section>
  )
}

export default ResetPassword

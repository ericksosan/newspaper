import { FormProvider, useForm } from 'react-hook-form'
import { formValidation } from '../../utils'
import type { FormInputsChangePassword } from '../../types'
import { useChangePassword } from '../../hooks'
import { ButtonLoading, ContainerAccountSettings, FormAlert, FormField } from '../molecules'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Redirect } from '../atoms'

const ChangePassword = (): JSX.Element => {
  const { user: { providerId } } = useAuth()
  const { alert, isLoading, onSubmitChangePassword } = useChangePassword()
  const methods = useForm<FormInputsChangePassword>()
  const { handleSubmit, watch } = methods

  if (providerId !== 'password') return <Redirect to='HOME' />

  return (
    <ContainerAccountSettings sectionTitle='Change Password'>
      <FormProvider {...methods}>
        <form onSubmit={(evt) => { void handleSubmit(onSubmitChangePassword)(evt) }}>

          {
            alert.code === 'error' && <FormAlert alert={alert} />
          }

          <FormField
            label="Current Password"
            type='password'
            name="oldPassword"
            placeholder="Enter your old password"
            validation={formValidation.password}
          />

          <FormField
            label="New Password"
            type='password'
            name="newPassword"
            placeholder="Enter your new password"
            validation={formValidation.confirmChangePassword(watch)}
          />

          <FormField
            label="Confirm Password"
            type='password'
            name="repassword"
            placeholder="Enter your new password again"
            validation={formValidation.confirmChangePassword(watch)}
          />

          <ButtonLoading
            color='blue'
            isLoading={isLoading}
          >
            Change Password
          </ButtonLoading>
        </form>
      </FormProvider>
    </ContainerAccountSettings>
  )
}

export default ChangePassword

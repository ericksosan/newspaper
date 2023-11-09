import { FormProvider, useForm } from 'react-hook-form'
import type { FormInputChangeUsername } from '../../types'
import { formValidation } from '../../utils'
import { Button } from '../atoms'
import { ContainerAccountSettings, FormField } from '../molecules'
import { ModalConfirmChanges } from '../organisms'
import { useChangeUsername } from '../../hooks'
import { useAuth } from '../../firebase/hooks/useAuth'

const ChangeUsername = (): JSX.Element => {
  const { user: { username } } = useAuth()
  const methods = useForm<FormInputChangeUsername>()
  const { handleSubmit } = methods
  const {
    isModalOpen,
    handlerToggleModal,
    handleUpdateUsername,
    onSubmitChangeUsername
  } = useChangeUsername()

  return (
    <ContainerAccountSettings sectionTitle='Change Username'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitChangeUsername)}>

          <FormField
            label="New Username"
            name="newUsername"
            placeholder="Enter your new username"
            validation={formValidation.confirmChangeUsername(username ?? '')}
          />

          <Button
            type='submit'
            colors='blue'
            className='w-full'
          >
            Change Username
          </Button>
        </form>
        {
          isModalOpen &&
          <ModalConfirmChanges
            handlerCloseModal={handlerToggleModal}
            handleConfirmChanges={() => { void handleUpdateUsername() }}
            title='Are you sure you want to change your username?' />
        }
      </FormProvider>
    </ContainerAccountSettings>
  )
}

export default ChangeUsername

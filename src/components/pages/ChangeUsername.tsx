import { FormProvider, useForm } from 'react-hook-form'
import type { FormInputChangeUsername } from '../../types'
import { formValidation } from '../../utils'
import { Button } from '../atoms'
import { ContainerAccountSettings, FormAlert, FormField } from '../molecules'
import { ModalConfirmChanges } from '../organisms'
import { useChangeUsername } from '../../hooks'

const ChangeUsername = (): JSX.Element => {
  const { alert, handleUpdateUsername, handleSetOpenModal, isLoading, onSubmitChangeUsername, openModal } = useChangeUsername()
  const methods = useForm<FormInputChangeUsername>()
  const { handleSubmit } = methods

  return (
    <ContainerAccountSettings sectionTitle='Change Username'>
      <FormProvider {...methods}>
        <form onSubmit={() => { handleSubmit(onSubmitChangeUsername) }}>

          {
            alert.code === 'success' && <FormAlert alert={alert} />
          }

          <FormField
            label="New Username"
            name="newUsername"
            placeholder="Enter your new username"
            validation={formValidation.standard}
          />

          <Button
            type='submit'
            colors='blue'
            className='w-full'
          >
            Change Username
          </Button>
        </form>
        <ModalConfirmChanges
          isLoading={isLoading}
          handleConfirmChanges={() => { void handleUpdateUsername() }}
          handleSetOpenModal={handleSetOpenModal}
          openModal={openModal}
          title='Are you sure you want to change your username?' />
      </FormProvider>
    </ContainerAccountSettings>
  )
}

export default ChangeUsername
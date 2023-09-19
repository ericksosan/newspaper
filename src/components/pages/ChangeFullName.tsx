import { FormProvider, useForm } from 'react-hook-form'
import { useChangeFullName } from '../../hooks'
import { formValidation } from '../../utils'
import type { FormInputChangeFullName } from '../../types'
import { ModalConfirmChanges } from '../organisms'
import { ContainerAccountSettings, FormField } from '../molecules'
import { Button } from '../atoms'

const ChangeFullName = (): JSX.Element => {
  const methods = useForm<FormInputChangeFullName>()
  const { handleSubmit, reset } = methods
  const { openModal, handleSetOpenModal, onSubmitChangeFullName, handleUpdateFullName } = useChangeFullName(reset)

  return (
    <ContainerAccountSettings sectionTitle='Change Full Name'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitChangeFullName)}>

          <FormField
            label="First name"
            name="firstname"
            placeholder="Enter your new first name"
            validation={formValidation.standard}
          />

          <FormField
            label="Last name"
            name="lastname"
            placeholder="Enter your new last name"
            validation={formValidation.standard}
          />

          <Button
            type='submit'
            colors='blue'
            className='w-full'>
            Save Changes
          </Button>
        </form>
        <ModalConfirmChanges
          handleConfirmChanges={handleUpdateFullName}
          handleSetOpenModal={handleSetOpenModal}
          openModal={openModal}
          title='Are you sure you want to change your full name?' />
      </FormProvider>
    </ContainerAccountSettings>
  )
}

export default ChangeFullName

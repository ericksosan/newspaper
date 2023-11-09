import { ContainerAccountSettings } from '../molecules'
import { UpdateProfilePicture } from '../organisms'

const ChangeProfilePicture = (): JSX.Element => {
  return (
    <ContainerAccountSettings sectionTitle='Change Profile Picture'>
      <UpdateProfilePicture />
    </ContainerAccountSettings>
  )
}

export default ChangeProfilePicture

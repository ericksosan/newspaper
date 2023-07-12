import { faKey, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { DropdownLinkOption } from '.'

export const NormalUserOptions = (): JSX.Element => {
  return (
    <>
      <DropdownLinkOption
        to='/profile/change-username'
        label='Change Username'
        icon={faUserPen}
      />
      <DropdownLinkOption
        to='/profile/change-password'
        label='Change Password'
        icon={faKey}
      />
    </>
  )
}

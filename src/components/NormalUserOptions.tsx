import { DropdownLinkOption } from '.'
import { UserPencil, Key } from './Icons'

export const NormalUserOptions = (): JSX.Element => {
  return (
    <>
      <DropdownLinkOption
        to='/profile/change-username'
        label='Change Username'
        icon={<UserPencil />}
      />
      <DropdownLinkOption
        to='/profile/change-password'
        label='Change Password'
        icon={<Key />}
      />
    </>
  )
}

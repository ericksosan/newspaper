import { UserDropdownDivideBySection } from '.'
import { UserPencil, Key, DropdownItem } from '../../atoms'

export const NormalUserOptions = (): JSX.Element => {
  return (
    <>
      <UserDropdownDivideBySection
        sectionTitle='Account settings'
        className='py-2'
      />

      <DropdownItem to='CHANGE_USERNAME'>
        <UserPencil />
        Change Username
      </DropdownItem>

      <DropdownItem to='CHANGE_PASSWORD'>
        <Key />
        Change Password
      </DropdownItem>
    </>
  )
}

import { UserDropdownDivideBySection } from '.'
import { useAuth } from '../../../firebase/hooks/useAuth'
import type { UserOptionsProps } from '../../../types'
import { DropdownItem } from '../../atoms'
import { KeyIcon, UserPencilIcon, WriteIcon } from '../../atoms/icon'

export const NormalUserOptions: React.FC<UserOptionsProps> = ({ children }): JSX.Element => {
  const { user: { providerId } } = useAuth()

  return (
    <>
      {children}

      <UserDropdownDivideBySection
        sectionTitle='Account settings'
        className='py-2'
      />

      <DropdownItem to='CHANGE_USERNAME'>
        <UserPencilIcon />
        Change Username
      </DropdownItem>

      {
        providerId === 'password' &&
        <DropdownItem to='CHANGE_PASSWORD'>
          <KeyIcon />
          Change Password
        </DropdownItem>
      }

      <DropdownItem to='CHANGE_FULLNAME'>
        <WriteIcon />
        Change Full Name
      </DropdownItem>
    </>
  )
}

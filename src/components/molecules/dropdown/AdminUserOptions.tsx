import { UserDropdownDivideBySection } from '.'
import { DropdownItem } from '../../atoms'
import { GroupUsersIcon, NewspaperIcon, PecilSquareIcon } from '../../atoms/icon'

export const AdminUserOptions = (): JSX.Element => {
  return (
    <>
      <UserDropdownDivideBySection sectionTitle='Management' />

      <DropdownItem to='WRITE_NEWS'>
        <PecilSquareIcon />
        Write News
      </DropdownItem>

      <DropdownItem to='ADMIN_NEWS'>
        <NewspaperIcon />
        Manage News
      </DropdownItem>

      <DropdownItem to='ADMIN_USERS'>
        <GroupUsersIcon />
        Manage Users
      </DropdownItem>
    </>
  )
}

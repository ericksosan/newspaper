
import { DropdownItem, GroupUsers, Newspaper, PecilSquare } from '../../atoms'

export const AdminUserOptions = (): JSX.Element => {
  return (
    <>
      <DropdownItem to='ADMIN_NEWS'>
        <Newspaper />
        Manage News
      </DropdownItem>

      <DropdownItem to='WRITE_NEWS'>
        <PecilSquare />
        Write News
      </DropdownItem>

      <DropdownItem to='ADMIN_USERS'>
        <GroupUsers />
        Manage Users
      </DropdownItem>
    </>
  )
}

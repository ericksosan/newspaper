import { EditorUserOptions } from '.'
import { DropdownItem } from '../../atoms'
import { GroupUsersIcon } from '../../atoms/icon'

export const AdminUserOptions = (): JSX.Element => {
  return (
    <EditorUserOptions>
      <DropdownItem to='ADMIN_USERS'>
        <GroupUsersIcon />
        Manage Users
      </DropdownItem>
    </EditorUserOptions>
  )
}

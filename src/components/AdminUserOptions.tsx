import { faPenToSquare, faNewspaper, faUsers } from '@fortawesome/free-solid-svg-icons'
import { DropdownLinkOption } from '.'

export const AdminUserOptions = (): JSX.Element => {
  return (
    <>
      <DropdownLinkOption
        to='/admin/news'
        icon={faNewspaper}
        label='News'
      />
      <DropdownLinkOption
        to='/admin/news/add'
        icon={faPenToSquare}
        label='Create News'
      />
      <DropdownLinkOption
        to='/admin/users'
        icon={faUsers}
        label='Users'
      />
    </>
  )
}

import { Newspaper, PecilSquare, GroupUsers } from './Icons'
import { DropdownLinkOption } from '.'

export const AdminUserOptions = (): JSX.Element => {
  return (
    <>
      <DropdownLinkOption
        to='/admin/news'
        icon={<Newspaper />}
        label='News'
      />
      <DropdownLinkOption
        to='/admin/news/add'
        icon={<PecilSquare />}
        label='Create News'
      />
      <DropdownLinkOption
        to='/admin/users'
        icon={<GroupUsers />}
        label='Users'
      />
    </>
  )
}

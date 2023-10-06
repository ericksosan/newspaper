import { UserTableRow } from '.'
import { useManagerUser } from '../../../hooks'
import { SkeletonUserTableRow } from '../../organisms'

export const UserTableBody = (): JSX.Element => {
  const { isLoading, listUsers } = useManagerUser()
  return (
    <tbody>
      {
        isLoading
          ? Array(8).fill('').map((_item, i) => (<SkeletonUserTableRow key={i} />))
          : listUsers.map((user) => (
            <UserTableRow key={user.id} {...user} />
          ))
      }
    </tbody>
  )
}

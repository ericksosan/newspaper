import { AdminUserOptions, NormalUserOptions } from '.'
import { useAuth } from '../../../firebase/hooks/useAuth'

export const UserOptions = (): JSX.Element => {
  const { user } = useAuth()
  const { isAdmin } = user

  return (
    <>
      {isAdmin && <AdminUserOptions />}
      <NormalUserOptions />
    </>
  )
}

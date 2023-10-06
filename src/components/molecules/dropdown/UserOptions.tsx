import { AdminUserOptions, NormalUserOptions } from '.'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { EditorUserOptions } from './EditorUserOptions'

export const UserOptions = (): JSX.Element => {
  const { user: { role } } = useAuth()

  const userOptions = {
    reader: <NormalUserOptions />,
    editor: <EditorUserOptions />,
    admin: <AdminUserOptions />
  }

  return userOptions[role]
}

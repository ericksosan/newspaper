import { NormalUserOptions, UserDropdownDivideBySection } from '.'
import type { UserOptionsProps } from '../../../types'
import { DropdownItem } from '../../atoms'
import { NewspaperIcon, PecilSquareIcon } from '../../atoms/icon'

export const EditorUserOptions: React.FC<UserOptionsProps> = ({ children }): JSX.Element => {
  return (
    <NormalUserOptions>
      <UserDropdownDivideBySection sectionTitle='Management' />

      <DropdownItem to='WRITE_NEWS'>
        <PecilSquareIcon />
        Write News
      </DropdownItem>

      <DropdownItem to='ADMIN_NEWS'>
        <NewspaperIcon />
        Manage News
      </DropdownItem>

      {children}
    </NormalUserOptions>
  )
}

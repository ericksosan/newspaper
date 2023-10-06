import { BoockIcon, CheckBadgeIcon, PencilBoltIcon } from '../../atoms/icon'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { twMerge } from 'tailwind-merge'

export const BadgeRoles = (): JSX.Element => {
  const { user: { role } } = useAuth()

  const chooserBadgeIcon = {
    reader: <BoockIcon />,
    editor: <PencilBoltIcon />,
    admin: <CheckBadgeIcon />
  }

  return (
    <span className={
      twMerge(
        `flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full select-none gap-x-0.5
        bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300`,
        role === 'admin' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        role === 'editor' && 'bg-azure-radiance-100 text-azure-radiance-800 dark:bg-azure-radiance-900 dark:text-azure-radiance-300'
      )
    }>

      {chooserBadgeIcon[role]}

      {role[0].toUpperCase()}{role.slice(1, role.length)}
    </span>

  )
}

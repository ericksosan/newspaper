import { Avatar } from '.'
import { CheckBadge } from '../../components/Icons'
import { useAuth } from '../../firebase/hooks/useAuth'

export const UserDetails = (): JSX.Element => {
  const { user } = useAuth()
  const { fullname, email, username, isAdmin } = user

  return (
    <div className="flex gap-2 font-inter py-2">
      <Avatar />
      <div className="flex flex-col [&>span]:text-sm [&>span]:text-slate [&>span]:dark:text-gray-200">
        <div className="flex items-center gap-1 font-bold text-slate dark:text-gray-200">
          {fullname}
          {isAdmin && <CheckBadge className='text-azure-radiance-700' />}
        </div>
        <span className='font-medium'>{email}</span>
        <span className='font-regular'>{username}</span>
      </div>
    </div>
  )
}

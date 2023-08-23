import { Avatar, BadgeAdmin } from '..'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { SubTitle } from '../../atoms'

export const UserDetailsDropdown = (): JSX.Element => {
  const { user } = useAuth()
  const { fullname, email, username, isAdmin, photoURL } = user

  return (
    <div className="flex gap-2 font-inter px-4 py-5">
      <Avatar img={photoURL ?? ''} alt={fullname ?? ''} />
      <div className="flex flex-col [&>span]:text-sm [&>span]:text-slate [&>span]:dark:text-gray-200">
        <div className="flex items-center gap-1 font-bold text-slate dark:text-gray-200">
          {fullname}
          {isAdmin && <BadgeAdmin />}
        </div>
        <SubTitle className='font-medium'>{email}</SubTitle>
        <SubTitle>{username}</SubTitle>
      </div>
    </div>
  )
}

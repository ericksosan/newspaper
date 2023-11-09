import { Avatar, BadgeRoles } from '..'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { trimFullName } from '../../../utils'
import { SubTitle } from '../../atoms'

export const UserDetailsDropdown = (): JSX.Element => {
  const { user } = useAuth()
  const { fullname, email, username, photoURL } = user

  return (
    <figure className="flex gap-2 font-inter px-2 py-5">
      <Avatar img={photoURL} alt={fullname ?? ''} />
      <div className="flex flex-col [&>span]:text-sm [&>span]:text-slate [&>span]:dark:text-gray-200">
        <div className="flex items-center gap-1 font-bold text-slate dark:text-gray-200">
          {trimFullName(fullname ?? '')}
          <BadgeRoles />
        </div>
        <SubTitle className='font-medium'>{email}</SubTitle>
        <SubTitle>{username}</SubTitle>
      </div>
    </figure>
  )
}

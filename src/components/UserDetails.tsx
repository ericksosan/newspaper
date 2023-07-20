import { Avatar } from '.'
import { CheckBadge } from './Icons'

export const UserDetails = (): JSX.Element => {
  return (
    <div className="flex gap-2 font-inter py-2">
      <Avatar role="none" />
      <div className="flex flex-col [&>span]:text-sm [&>span]:text-slate [&>span]:dark:text-gray-200">
        <div className="flex items-center gap-1 font-bold text-slate dark:text-gray-200">
          Erick Sosa
          <CheckBadge className='text-azure-radiance-700'/>
        </div>
        <span className='font-medium'>ericksosa@gmail.com</span>
        <span className='font-regular'>ericksosa</span>
      </div>
    </div>
  )
}

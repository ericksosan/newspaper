import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { Avatar } from '.'

export const UserDetails = (): JSX.Element => {
  return (
    <div className="flex gap-2 font-inter">
      <Avatar ripple={false} role="none" />
      <div className="flex flex-col">
        <div className="flex items-center gap-2 font-bold
          text-slate dark:text-gray-200">
          Erick Sosa
          <FontAwesomeIcon icon={faCheckDouble} className='text-success' />
        </div>
        <span className='font-medium text-sm text-slate dark:text-gray-200'>ericksosa@gmail.com</span>
        <span className='font-regular text-sm text-slate dark:text-gray-200'>ericksosa</span>
      </div>
    </div>
  )
}

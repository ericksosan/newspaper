import { twMerge } from 'tailwind-merge'
import { Divider, SubTitle } from '../../atoms'

interface UserDropdownDivideBySectionProps {
  sectionTitle: string
  className?: string
}

export const UserDropdownDivideBySection: React.FC<UserDropdownDivideBySectionProps> = ({ className, sectionTitle }) => {
  return (
    <div className={
      twMerge(
        'flex items-center pb-2',
        className
      )
    }>
      <Divider className='dark:border-gray-700/30' />
      <SubTitle className='block text-sm w-full text-center text-gray-400
      dark:text-slate-400 select-none'
      >
        {sectionTitle}
      </SubTitle>
      <Divider className='dark:border-gray-700/30' />
    </div>
  )
}

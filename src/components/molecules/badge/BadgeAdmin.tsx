import { CheckBadge, SubTitle } from '../../atoms'

export const BadgeAdmin = (): JSX.Element => {
  return (
    <span className="flex items-center  bg-green-100 text-green-800 text-xs font-medium px-1.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      <CheckBadge className='w-4 h-4'/> <SubTitle className='block'>Admin</SubTitle>
    </span>

  )
}

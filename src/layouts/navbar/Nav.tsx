import { Link } from 'react-router-dom'
import { DarkThemeToggle, UserDropdown } from '../../layouts/navbar'

export const Nav = (): JSX.Element => {
  return (
    <nav className="h-16 w-full flex justify-between items-center px-5 md:px-10
        border-y dark:bg-slate-800 dark:border-slate-700 relative font-montserrat">
      <Link to='/' className="inline-block text-xl font-bold
        text-azure-radiance-700 dark:text-gray-200">
        Newspaper
      </Link>
      <div className="flex items-center justify-between gap-5">
        <DarkThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  )
}

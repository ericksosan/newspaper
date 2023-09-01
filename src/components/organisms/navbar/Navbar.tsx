import { twMerge } from 'tailwind-merge'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { Nav, LinkRedirect } from '../../atoms'
import { DarkThemeToggle } from '../../molecules'
import { UserDropdown } from '..'

export const Navbar = ({ className }: { className?: string }): JSX.Element => {
  const { isLogout } = useAuth()

  return (
    <Nav className={className}>
      <LinkRedirect
        to='HOME'
        hoverColor={false}
        className={twMerge(
          'text-xl text-azure-radiance-700',
          !isLogout && 'pointer-events-none'
        )}
      >
        Newspaper
      </LinkRedirect>
      <div className="flex items-center justify-between gap-5">
        <DarkThemeToggle />
        {isLogout && <UserDropdown />}
      </div>
    </Nav>
  )
}

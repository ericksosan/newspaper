import { useAuth } from '../../../firebase/hooks/useAuth'
import { Nav, LinkRedirect } from '../../atoms'
import { DarkThemeToggle } from '../../molecules'
import { DropdownMenu } from '..'
import { DropdownMenuProvider } from '../../../contexts'

export const Navbar = ({ className }: { className?: string }): JSX.Element => {
  const { isLogout } = useAuth()

  return (
    <Nav className={className}>
      <LinkRedirect
        to='HOME'
        hoverColor={false}
        className={`text-xl text-azure-radiance-700 ${!isLogout ? 'pointer-events-none' : ''}`} >
        Newspaper
      </LinkRedirect>
      <div className="flex items-center justify-between gap-5">
        <DarkThemeToggle />

        {
          isLogout &&
          <DropdownMenuProvider>
            <DropdownMenu />
          </DropdownMenuProvider>
        }
      </div>
    </Nav>
  )
}

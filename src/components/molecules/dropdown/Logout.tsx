import { useState } from 'react'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { ArrowRightRectangle, DropdownItem, Spinner } from '../../atoms'

export const Logout = (): JSX.Element => {
  const { logout, navigateTo } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await logout()
      navigateTo('LOGIN')
      setIsLoading(false)
    } catch (error) { setIsLoading(false) }
  }

  return (
    <DropdownItem onClick={() => { void handleLogout() }}>
      { isLoading && <Spinner/> } <ArrowRightRectangle /> Logout
    </DropdownItem>
  )
}

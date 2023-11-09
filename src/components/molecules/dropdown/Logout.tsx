import { useState } from 'react'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { Spinner } from '../../atoms'
import { ArrowRightRectangleIcon } from '../../atoms/icon'

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
    <button
      onClick={() => { void handleLogout() }}
      className='dropdown-item disabled:pointer-events-none'
      disabled={isLoading}
    >
      {
        isLoading
          ? <>Leaving... <Spinner /></>
          : <><ArrowRightRectangleIcon /> Logout</>
      }
    </button>
  )
}

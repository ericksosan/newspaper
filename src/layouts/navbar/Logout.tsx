import { useState } from 'react'
import { ArrowRightRectangle } from '../../components/Icons'
import { useAuth } from '../../firebase/hooks/useAuth'
import { useNavigate } from 'react-router'
import { Spinner } from '../../components'

export const Logout = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { logout, handleLogoutReset } = useAuth()

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoading(true)
      await logout()
      setIsLoading(false)
      handleLogoutReset()
      navigate('/auth/login', { replace: true })
    } catch (error) { }
  }

  return (
    <button
      onClick={() => { void handleLogout() }}
      disabled={isLoading}
      className='p-3 font-semibold hover:text-azure-radiance-700 w-full
      transition-colors ease-in-out duration-300 cursor-pointer dark:text-gray-200
      dark:hover:bg-gray-600 border-none rounded-md flex gap-2 items-center [&>svg]:w-5
      disabled:pointer-events-none'
    >
      {
        isLoading
          ? <Spinner />
          : <>
            <ArrowRightRectangle />
            Logout
          </>
      }
    </button>
  )
}

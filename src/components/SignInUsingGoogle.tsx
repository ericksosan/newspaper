import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authSignInWithGoogle } from '../firebase/authentication'
import { GoogleIcon, Spinner } from '.'
import { useAuth } from '../firebase/hooks/useAuth'

export const SignInUsingGoogle = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { handleGetUserData } = useAuth()

  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const userCredentials = await authSignInWithGoogle()
      await handleGetUserData(userCredentials.user.uid)
      navigate('/')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <button
      type='button'
      onClick={() => { void handleSignInWithGoogle() }}
      disabled={isLoading}
      className="font-semibold bg-white border border-slate-400 w-full py-2
      rounded-md text-slate-900 hover:bg-slate-100 hover:dark:bg-slate-300
      transition-colors duration-500 ease-in-out mt-4 flex items-center gap-2
      justify-center disabled:pointer-events-none"
    >
      {
        isLoading
          ? < Spinner className='border-t-azure-radiance-700 border-t-2 border-l-2' />
          : <>
            <GoogleIcon /> Google
          </>
      }
    </button>
  )
}

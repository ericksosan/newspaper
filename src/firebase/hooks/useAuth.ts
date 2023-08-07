import { useContext } from 'react'
import { AuthContext, type AuthContextValues } from '../contexts/AuthContext'

export const useAuth = (): AuthContextValues => {
  const auth = useContext(AuthContext)

  return {
    ...auth
  }
}

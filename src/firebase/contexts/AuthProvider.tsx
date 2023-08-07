import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext, type AuthContextValues } from './AuthContext'
import { auth } from '../firebase.config'
import { type UserDetails, getUserDetails } from '../database/users'
import { logout } from '../authentication/logout'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogout, setIsLogout] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userDetailsLoaded, setUserDetailsLoaded] = useState<boolean>(true)
  const [user, setUser] = useState<UserDetails>({} as UserDetails)

  useEffect(() => {
    const deconnect = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setIsLogout(true)
        setIsLoading(false)
        void handleGetUserData(currentUser.uid)
      } else {
        setUser({} as UserDetails)
        setIsLogout(false)
        setIsLoading(false)
      }
    })
    return deconnect
  }, [])

  const handleGetUserData = async (id: string): Promise<void> => {
    try {
      const res = await getUserDetails(id)
      if (res !== undefined) {
        setUser(res as UserDetails)
        setUserDetailsLoaded(false)
      }
    } catch (error) { }
  }

  const handleLogoutReset = (): void => {
    setUser({} as UserDetails)
    setIsLogout(false)
  }

  const values: AuthContextValues = {
    isLoading,
    isLogout,
    user,
    logout,
    handleLogoutReset,
    userDetailsLoaded,
    handleGetUserData
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

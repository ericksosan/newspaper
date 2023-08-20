import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext, type AuthContextValues } from './AuthContext'
import { auth } from '../firebase.config'
import { type UserDetails, getUserDetails } from '../database/users'
import { logout } from '../authentication/logout'
import { AppRoutes } from '../../routes'
import { type NavigateOptions, useNavigate } from 'react-router-dom'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogout, setIsLogout] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userDetailsLoaded, setUserDetailsLoaded] = useState<boolean>(true)
  const [user, setUser] = useState<UserDetails>({} as UserDetails)
  const navigate = useNavigate()

  useEffect(() => {
    const deconnect = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setIsLogout(true)
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
        setIsLoading(false)
      }
    } catch (error) { }
  }

  const handleChangeUsername = (username: string): void => {
    setUser(
      {
        ...user,
        username
      }
    )
  }

  const handleLogoutReset = (): void => {
    setUser({} as UserDetails)
    setIsLogout(false)
  }

  const navigateTo = (path: keyof typeof AppRoutes, options?: NavigateOptions): void => {
    navigate(AppRoutes[path], options)
  }

  const values: AuthContextValues = {
    isLoading,
    isLogout,
    user,
    logout,
    handleLogoutReset,
    userDetailsLoaded,
    handleGetUserData,
    handleChangeUsername,
    navigateTo
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

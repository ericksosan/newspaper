import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { AuthContext, type NewUserDetails, type AuthContextValues } from './AuthContext'
import { auth } from '../firebase.config'
import { type UserDetails, getUserDetails } from '../database/users'
import { logout } from '../authentication/logout'
import { AppRoutes } from '../../routes'
import { type NavigateOptions, useNavigate } from 'react-router-dom'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useLocation } from 'react-router-dom'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLogout, setIsLogout] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<UserDetails>({} as UserDetails)
  const [isModalProfileOpen, setIsModalProfileOpen] = useState(false)
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [, setShareLink] = useLocalStorage('sharelink')

  useEffect(() => {
    if (/^\/new\/[A-Za-z0-9]+$/.test(pathname)) setShareLink(pathname)
  }, [location])

  useEffect(() => {
    const disconnect = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        setIsLogout(true)
        void handleGetUserData(currentUser.uid)
        return
      }

      setUser({} as UserDetails)
      setIsLogout(false)
      setIsLoading(false)
    })

    return disconnect
  }, [])

  const handleGetUserData = async (id: string): Promise<void> => {
    const userDetails = await getUserDetails(id)

    if (!userDetails) return

    setUser(userDetails as UserDetails)
    setIsLoading(false)
  }

  const handleLogoutReset = (): void => {
    setUser({} as UserDetails)
    setIsLogout(false)
  }

  const navigateTo = (path: keyof typeof AppRoutes, options?: NavigateOptions): void => {
    navigate(AppRoutes[path], options)
  }

  const handleUpdateLocalUserDatails = (newUserDetails: NewUserDetails): void => {
    setUser((prev) => ({ ...prev, ...newUserDetails }))
  }

  const handleIsModalProfileOpen = (status: boolean): void => {
    setIsModalProfileOpen(status)
  }

  const values: AuthContextValues = {
    isLoading,
    isLogout,
    user,
    isModalProfileOpen,
    logout,
    handleIsModalProfileOpen,
    handleLogoutReset,
    handleGetUserData,
    handleUpdateLocalUserDatails,
    navigateTo
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}

import { createContext } from 'react'
import { type UserDetails } from '../database/users'

export interface AuthContextValues {
  isLogout: boolean
  isLoading: boolean
  user: UserDetails
  logout: () => Promise<void>
  handleLogoutReset: () => void
  userDetailsLoaded: boolean
  handleGetUserData: (id: string) => Promise<void>
  handleChangeUsername: (username: string) => void
}

export const AuthContext = createContext({} as AuthContextValues)

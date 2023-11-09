import { createContext } from 'react'
import { type AppRoutes } from '../../routes'
import { type NavigateOptions } from 'react-router-dom'
import { type UserDetails } from '../database/users'

export interface NewUserDetails {
  firstname?: string | null
  lastname?: string | null
  username?: string | null
  photoURL?: string | null
  fullname?: string | null
}

export interface AuthContextValues {
  isLogout: boolean
  isLoading: boolean
  user: UserDetails
  isModalProfileOpen: boolean
  logout: () => Promise<void>
  handleLogoutReset: () => void
  handleIsModalProfileOpen: (status: boolean) => void
  handleGetUserData: (id: string) => Promise<void>
  handleUpdateLocalUserDatails: (newUserDetails: NewUserDetails) => void
  navigateTo: (path: keyof typeof AppRoutes, options?: NavigateOptions) => void
}

export const AuthContext = createContext({} as AuthContextValues)

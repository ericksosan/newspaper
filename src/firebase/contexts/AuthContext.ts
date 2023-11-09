import { createContext } from 'react'
import { type AppRoutes } from '../../routes'
import { type NavigateOptions } from 'react-router-dom'
import { type UserDetails } from '../database/users'
import type { FormInputChangeFullName } from '../../types'

export interface AuthContextValues {
  isLogout: boolean
  isLoading: boolean
  user: UserDetails
  logout: () => Promise<void>
  handleLogoutReset: () => void
  handleGetUserData: (id: string) => Promise<void>
  handleChangeUsername: (username: string) => void
  handleChangeFullName: (data: FormInputChangeFullName) => void
  navigateTo: (path: keyof typeof AppRoutes, options?: NavigateOptions) => void
}

export const AuthContext = createContext({} as AuthContextValues)

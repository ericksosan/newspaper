import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../firebase/hooks/useAuth'
import { Loading } from './Loading'

export const AdminRoutes = (): JSX.Element => {
  const { user, isLoading } = useAuth()
  const { isAdmin } = user

  if (isLoading) return <Loading />

  return (
    isAdmin
      ? <Outlet />
      : <Navigate to='/' />
  )
}

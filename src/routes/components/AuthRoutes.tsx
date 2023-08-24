import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading } from '../../components/molecules'

export const AuthRoutes = (): JSX.Element => {
  const { isLoading, isLogout } = useAuth()

  if (isLoading) return <Loading />

  return (
    isLogout
      ? <Navigate to='/' />
      : <Outlet />
  )
}

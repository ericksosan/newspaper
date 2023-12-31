import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading } from '../../components/molecules'

export const AdminRoutes = (): JSX.Element => {
  const { user: { role }, isLoading } = useAuth()

  const isAdmin = (role === 'admin')

  if (isLoading) return <Loading />

  return (
    isAdmin
      ? <Outlet />
      : <Navigate to='/' />
  )
}

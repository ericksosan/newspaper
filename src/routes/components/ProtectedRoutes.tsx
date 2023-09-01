import { Navigate } from 'react-router'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading } from '../../components/molecules'
import { Layout } from '../../components/organisms'

export const ProtectedRoutes = (): JSX.Element => {
  const { isLoading, isLogout } = useAuth()

  if (isLoading) return <Loading />

  return (
    isLogout
      ? <Layout />
      : <Navigate to='/auth/login' />
  )
}

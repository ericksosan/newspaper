import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading } from '../../components/molecules'

export const EditorRoutes = (): JSX.Element => {
  const { user: { role }, isLoading } = useAuth()

  const isEditor = (role === 'editor' || role === 'admin')

  if (isLoading) return <Loading />

  return (
    isEditor
      ? <Outlet />
      : <Navigate to='/' />
  )
}

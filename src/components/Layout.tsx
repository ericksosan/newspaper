import { Outlet } from 'react-router-dom'
import { useAuth } from '../firebase/hooks/useAuth'
import { Redirect } from './atoms'
import { Loading } from './molecules'

export const Layout = (): JSX.Element => {
  const { isLoading, isLogout } = useAuth()

  if (isLoading) return <Loading/>

  if (!isLogout) return <Redirect to='HOME'/>

  return (
    <>
      <Nav/>
      <Outlet />
      <Footer/>
    </>
  )
}

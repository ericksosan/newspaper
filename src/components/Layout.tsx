import { Outlet } from 'react-router-dom'
import { Footer, Nav } from '../layouts'
import { useAuth } from '../firebase/hooks/useAuth'
import { Loading } from './Loading'
export const Layout = (): JSX.Element => {
  const { isLoading } = useAuth()

  if (isLoading) return <Loading/>

  return (
    <>
      <Nav/>
      <Outlet />
      <Footer/>
    </>
  )
}

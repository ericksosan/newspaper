import { Outlet } from 'react-router-dom'
import { Navbar, Footer } from '..'
import { Redirect } from '../../atoms'
import { Loading } from '../../molecules'
import { useAuth } from '../../../firebase/hooks/useAuth'

export const Layout = (): JSX.Element => {
  const { isLoading, isLogout } = useAuth()

  if (isLoading) return <Loading />

  if (!isLogout) return <Redirect to='LOGIN' />

  return (
    <>
      <Navbar
        className='border-b dark:bg-slate-800 dark:border-slate-700'
      />
      <Outlet />
      <Footer />
    </>
  )
}

import { Outlet } from 'react-router-dom'
import { Footer, Nav } from '../layouts'
export const Layout = (): JSX.Element => {
  return (
    <>
      <Nav/>
      <Outlet />
      <Footer/>
    </>
  )
}

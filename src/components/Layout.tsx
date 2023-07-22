import { Outlet } from 'react-router-dom'
import { Nav } from '.'
export const Layout = (): JSX.Element => {
  return (
    <div>
      <Nav/>
      <Outlet />
      <h1 className="text-3xl font-bold">Footer</h1>
    </div>
  )
}

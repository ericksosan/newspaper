import { Outlet } from 'react-router-dom'
import { Nav } from '.'
export const Layout = (): JSX.Element => {
  return (
    <div className='dark:bg-slate-800'>
      <Nav/>
      <Outlet />
      <h1 className="text-3xl font-bold">Footer</h1>
    </div>
  )
}

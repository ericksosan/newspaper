import { Navigate } from 'react-router-dom'
import { AppRoutes } from '../../../routes'

interface RedirectProps {
  to: keyof typeof AppRoutes
}
export const Redirect: React.FC<RedirectProps> = ({ to }) => {
  return (
    <Navigate to={AppRoutes[to]} />
  )
}

import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { AppRoutes } from '../../../routes'

interface LinkRedirectProps {
  children: React.ReactNode
  to: keyof typeof AppRoutes
  className?: string
  hoverColor?: boolean
  pathOptional?: string
}

export const LinkRedirect: React.FC<LinkRedirectProps> = ({ children, className, to, hoverColor, pathOptional }) => {
  return (
    <Link
      to={AppRoutes[to].concat(pathOptional ?? '')}
      className={
        twMerge(
          `font-bold text-azure-radiance-700 dark:text-gray-200
          transition-colors duration-300 ease-in-out`,
          hoverColor && 'hover:text-azure-radiance-800 dark:hover:text-azure-radiance-500',
          className
        )
      }
    >
      {children}
    </Link>
  )
}

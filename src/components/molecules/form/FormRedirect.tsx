import { LinkRedirect, SubTitle } from '../../atoms'
import type { AppRoutes } from '../../../routes'

interface FormRedirectProps {
  to: keyof typeof AppRoutes
  goToTitle: string
  title: string
}

export const FormRedirect: React.FC<FormRedirectProps> = ({ goToTitle, title, to }) => {
  return (
    <div className="flex justify-center items-center pt-4 gap-2">
      <SubTitle className='font-medium dark:text-gray-200'>{title}</SubTitle>
      <LinkRedirect to={to} >{goToTitle}</LinkRedirect>
    </div>
  )
}

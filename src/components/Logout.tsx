import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { DropdownLinkOption } from '.'

export const Logout = (): JSX.Element => {
  return (
    <DropdownLinkOption
      to='#'
      icon={faRightFromBracket}
      label='Logout'
      rippleColor='danger'
    />
  )
}

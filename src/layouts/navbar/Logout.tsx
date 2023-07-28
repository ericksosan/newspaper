import { ArrowRightRectangle } from '../../components/Icons'
import { DropdownLinkOption } from '.'

export const Logout = (): JSX.Element => {
  return (
    <DropdownLinkOption
      to='#'
      icon={<ArrowRightRectangle />}
      label='Logout'
    />
  )
}

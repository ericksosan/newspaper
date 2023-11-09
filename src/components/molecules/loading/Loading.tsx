import { Spinner } from '../../atoms'

export const Loading = (): JSX.Element => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <Spinner />
    </div>
  )
}

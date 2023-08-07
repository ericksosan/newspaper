import { Spinner } from '.'

export const Loading = (): JSX.Element => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <Spinner className="border-t-azure-radiance-700 border-t-2 border-l-2"/>
    </div>
  )
}

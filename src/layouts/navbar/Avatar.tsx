import { Spinner } from '../../components'
import { useAuth } from '../../firebase/hooks/useAuth'

export const Avatar = (): JSX.Element => {
  const { user, userDetailsLoaded } = useAuth()
  const { photoURL, fullname } = user

  return (
    <picture
      className='w-10 h-10 overflow-hidden rounded-full
      grid place-content-center'
    >
      {
        !userDetailsLoaded
          ? <img
            src={photoURL ?? ''}
            alt={`Profile ${fullname ?? ''}`}
            className='object-cover w-full h-full'
          />
          : <Spinner className='border-t-slate-800'/>
      }
    </picture>
  )
}

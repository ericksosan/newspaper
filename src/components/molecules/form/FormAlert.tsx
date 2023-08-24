import { twMerge } from 'tailwind-merge'
import { ErrorSignalIcon, SuccessSignalIcon } from '../../atoms/icon'
import type { Alert } from '../../../types'

export const FormAlert: React.FC<Alert> = ({ code, message }) => {
  const status = (code === 'success')

  return (
    <div
      className={
        twMerge(
          `flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300
          rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800
          animate-shake animate-delay-500 animate-ease-in-out`,
          !status &&
          `text-red-800 border-red-300  bg-red-50 dark:text-red-400
          dark:border-red-800`
        )
      }
      role="alert"
    >
      {
        status ? <SuccessSignalIcon /> : <ErrorSignalIcon />
      }
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{status ? 'Success!' : 'Error!'}</span> {message}.
      </div>
    </div>
  )
}

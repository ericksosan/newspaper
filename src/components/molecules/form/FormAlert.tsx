import { twMerge } from 'tailwind-merge'
import { ErrorSignal, SuccessSignal } from '../..'

type AlertType = 'success' | 'error'

interface FormAlertProps {
  type: AlertType
  message: string
}

export const FormAlert: React.FC<FormAlertProps> = ({ type, message }) => {
  const status = (type === 'success')

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
        status ? <SuccessSignal /> : <ErrorSignal />
      }
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{status ? 'Success!' : 'Error!'}</span> {message}.
      </div>
    </div>
  )
}

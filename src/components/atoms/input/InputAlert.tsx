import { twMerge } from 'tailwind-merge'

interface InputAlertProps {
  message: string
  className?: string
}
export const InputAlert: React.FC<InputAlertProps> = ({ message, className }) => {
  let messageSplited: string[] = []

  if (message.includes('/')) {
    messageSplited = message.split('/')
  }

  return (
    <div className={
      twMerge(
        'mt-2 text-sm text-red-600 font-semibold flex gap-1 items-center',
        className
      )
    }>
      {
        messageSplited.length !== 0
          ? <div className="flex flex-col md:flex-row gap-1">
            <span className="block">{messageSplited[0]}</span>
            <span className="block text-green-500">{messageSplited[1]} </span>
          </div>
          : message
      }
    </div>
  )
}

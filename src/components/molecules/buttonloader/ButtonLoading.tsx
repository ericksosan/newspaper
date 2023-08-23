import { twMerge } from 'tailwind-merge'
import { Button, Spinner } from '../../atoms'

interface ButtonLoadingProps {
  type?: 'submit' | 'button'
  color?: 'blue' | 'white' | 'red'
  className?: string
  children: React.ReactNode
  isLoading: boolean
  onClick?: () => void
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ children, isLoading, type, className, onClick, color }) => {
  return (
    <Button
    type={type}
    onClick={onClick}
    className={
      twMerge(
        'w-full flex justify-center items-center shadow gap-2',
        color === 'blue' && 'bg-azure-radiance-700 hover:bg-azure-radiance-900 disabled:bg-azure-radiance-700/70 text-white',
        color === 'white' && 'bg-white text-slate-900 hover:bg-gray-200 border border-slate-300 disabled:bg-gray-100/70',
        color === 'red' && 'bg-red-600 text-gray-200 border border-slate-300 disabled:bg-red-700/80 hover:bg-red-800',
        className
      )
    }
    disabled={isLoading}
  >
    {isLoading ? <Spinner className={color === 'white' ? 'border-t-azure-radiance-700' : 'border-t-white' }/> : children}
    </Button>
  )
}

import { twMerge } from 'tailwind-merge'
import { Button, Spinner } from '../../atoms'
import type { ButtonColors } from '../../../types'

interface ButtonLoadingProps {
  type?: 'submit' | 'button'
  color?: ButtonColors
  className?: string
  children: React.ReactNode
  isLoading: boolean
  onClick?: () => void
}

export const ButtonLoading: React.FC<ButtonLoadingProps> = ({ children, isLoading, type, className, onClick, color }) => {
  return (
    <Button
      type={type}
      colors={color}
      onClick={onClick}
      disabled={isLoading}
      className={
        twMerge(
          'w-full flex justify-center items-center shadow gap-2',
          className
        )
      }
    >
      {isLoading ? <Spinner className={color === 'white' ? 'border-t-azure-radiance-700' : 'border-t-white'} /> : children}
    </Button>
  )
}

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
      {
        isLoading
          ? <Spinner className={
            color === 'white'
              ? 'text-slate-900 dark:text-slate-900'
              : 'text-white dark:text-white'
          } />
          : children
      }
    </Button>
  )
}

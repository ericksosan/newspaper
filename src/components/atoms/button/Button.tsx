import { twMerge } from 'tailwind-merge'
import type { ButtonColors } from '../../../types'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'button'
  onClick?: () => void
  disabled?: boolean
  colors?: ButtonColors
}

export const Button: React.FC<ButtonProps> = ({ children, className, type, disabled, onClick, colors }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        twMerge(
          `rounded-full transition-colors duration-300 ease-in-out
          disabled:pointer-events-none font-normal font-inter`,

          colors === 'white' && `bg-white text-slate-900 hover:bg-gray-100
          border border-slate-300 disabled:opacity-50 px-5 py-2`,
          colors === 'white' && `bg-white text-slate-900 hover:bg-gray-100
          border border-slate-300 disabled:opacity-50 px-5 py-2`,

          colors === 'blue' && `text-white bg-azure-radiance-700 border-none
          hover:bg-azure-radiance-800 text-sm px-5 py-2.5 disabled:opacity-50`,

          colors === 'red' && `focus:outline-none text-white bg-red-700
          hover:bg-red-800 text-sm px-5 py-2.5 dark:bg-red-600
          dark:hover:bg-red-700`,

          colors === 'dark' && `text-gray-900 bg-white border border-gray-300
          hover:bg-gray-100 text-sm px-5 py-3 dark:bg-gray-800 dark:text-white
          dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
          disabled:dark:bg-slate-700 disabled:dark:border-slate-700 disabled:dark:text-white
          disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-900 disabled:opacity-50`,
          className
        )
      }
    >
      {children}
    </button>
  )
}

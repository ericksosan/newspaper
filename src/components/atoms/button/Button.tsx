import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  type?: 'submit' | 'button'
  onClick?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ children, className, type, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={
        twMerge(
          `font-semibold py-2 rounded-md transition-colors duration-300 ease-in-out
            disabled:cursor-not-allowed`,
          className
        )
      }
    >
      {children}
    </button>
  )
}

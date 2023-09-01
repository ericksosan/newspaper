import { twMerge } from 'tailwind-merge'

interface LabelProps {
  children: React.ReactNode
  className?: string
  name: string
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({ children, className, name, required = false }) => {
  return (
    <label
      htmlFor={name}
      className={
        twMerge(
          'block mb-2 text-sm font-medium text-slate-700 dark:text-gray-200 sm:text-base',
          required && "after:content-['*'] after:text-red-600 after:text-lg after:font-bold",
          className
        )}
    >
      {children}
    </label>
  )
}

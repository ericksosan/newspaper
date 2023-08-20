import { forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="text-md rounded-md block w-full dark:text-gray-200 border-2 border-gray-200
      dark:bg-gray-800 dark:border-gray-700 pr-10 p-2.5 focus:border-azure-radiance-700
      dark:focus:border-gray-600 focus:ring-0"
    />
  )
})

Input.displayName = 'Input'

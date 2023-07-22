import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { detailsErrorsInput } from '../utils'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder: string
  validation?: RegisterOptions
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', validation, placeholder }) => {
  const { register, formState: { errors } } = useFormContext()

  const { message, isInvalid } = detailsErrorsInput(errors, name)

  return (
    <div className='mb-6 w-full'>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-slate-700
        dark:text-gray-200 after:content-['*'] after:text-red-600
        after:text-lg after:font-bold sm:text-base">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          className="text-md rounded-md focus:ring-azure-radiance-700
          block w-full dark:text-gray-200 border-gray-300 focus:ring-transparent
        focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600"
          placeholder={placeholder}
          autoComplete='off'
          {...register(name, validation)} />
        {
          isInvalid &&
          <p className="mt-2 absolute -top-10 right-0 text-sm
            text-red-600 lg:font-semibold
            xl:text-md animate-fade-up animate-duration-500 animate-ease-in-out">
            {message}
          </p>
        }
      </div>
    </div>
  )
}

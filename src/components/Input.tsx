import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { detailsErrorsInput } from '../utils'
import { useState } from 'react'
import { Eye, EyeSlash } from './Icons'

interface InputProps {
  label: string
  name: string
  type?: string
  placeholder: string
  validation?: RegisterOptions
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', validation, placeholder }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

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
        {
          type === 'password'
            ? <>
              <div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer" onClick={() => { setShowPassword(!showPassword) }}>
                  {
                    showPassword
                      ? <EyeSlash className='w-5 h-5 dark:text-gray-200' />
                      : <Eye className='w-5 h-5 dark:text-gray-200' />
                  }
                </div>
                <input
                  id={name}
                  type={showPassword ? 'text' : type}
                  className="text-md rounded-md focus:ring-azure-radiance-700
                  block w-full dark:text-gray-200 border-gray-300 focus:ring-transparent
                focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600 pr-10 p-2.5"
                  placeholder={placeholder}
                  autoComplete='off'
                  {...register(name, validation)} />
              </div>
            </>
            : <input
              id={name}
              type={type}
              className="text-md rounded-md focus:ring-azure-radiance-700
                block w-full dark:text-gray-200 border-gray-300 focus:ring-transparent
              focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600"
              placeholder={placeholder}
              autoComplete='off'
              {...register(name, validation)} />
        }
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

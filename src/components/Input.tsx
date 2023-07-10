import { useEffect } from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { Input as InputTw, Ripple, initTE } from 'tw-elements'
import { detailsErrorsInput } from '../utils'

interface InputProps {
  label: string
  name: string
  type?: string
  validation?: RegisterOptions
}

export const Input: React.FC<InputProps> = ({ label, name, type = 'text', validation }) => {
  const { register, formState: { errors } } = useFormContext()
  useEffect(() => {
    initTE({ Input: InputTw, Ripple }, true)
  }, [])

  const { message, isInvalid } = detailsErrorsInput(errors, name)

  return (
    <div className="relative mb-10" data-te-input-wrapper-init>
      <input
        type={type}
        className="peer block min-h-[auto]
          w-full rounded border-0 bg-transparent autofill:bg-transparent
          px-3 py-[0.32rem] leading-[2.15] outline-none
          transition-all duration-200 ease-linear
          focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100
          motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 dark:text-gray-200"
        placeholder={label}
        {...register(name, validation)}
        autoComplete='off'
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute
        left-3 top-0 mb-0 max-w-[90%] origin-[0_0]
        truncate pt-[0.37rem] leading-[2.15] text-neutral-500
        transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem]
        peer-focus:scale-[0.8] peer-focus:text-black
        peer-data-[te-input-state-active]:-translate-y-[1.15rem]
        peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:peer-focus:text-gray-200 dark:text-gray-200"
      >
        {label}
      </label>
      <span className="absolute left-0 -top-6 text-lg lg:font-bold after:content-['*'] after:text-red-500"></span>
      {
        isInvalid && <span className="text-red-500 text-sm absolute
        right-0 -top-6 transition duration-1000 ease-out"
        data-te-input-helper-ref>{ message }</span>
      }
    </div>
  )
}

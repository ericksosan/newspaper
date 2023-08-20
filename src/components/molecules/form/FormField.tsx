import { useState } from 'react'
import { useFormContext, type RegisterOptions } from 'react-hook-form'
import { Label, Input, InputAlert } from '../../atoms'
import { detailsErrorsInput } from '../../../utils'
import { Eye, EyeSlash } from '../..'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder: string
  validation?: RegisterOptions
}

export const FormField: React.FC<FormFieldProps> = ({ label, name, type, placeholder, validation }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { register, formState: { errors } } = useFormContext()

  const { message, isInvalid } = detailsErrorsInput(errors, name)

  return (
    <div className='mb-6 w-full'>
      <Label
        name={name}
        required
      >
        {label}
      </Label>
      <div className="relative">
        {
          type === 'password' && <div
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer"
            onClick={() => { setShowPassword(!showPassword) }}>
            {
              showPassword
                ? <EyeSlash className='w-5 h-5 dark:text-gray-200' />
                : <Eye className='w-5 h-5 dark:text-gray-200' />
            }
          </div>
        }
        <Input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          autoComplete='off'
          {...register(name, validation)}
        />
        {
          isInvalid && <InputAlert>{message}</InputAlert>
        }
      </div>
    </div>
  )
}

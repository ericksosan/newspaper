import type { UseFormWatch, RegisterOptions } from 'react-hook-form'
import type { FormInputsSignup, FormInputsChangePassword } from '../types'

const email: RegisterOptions = {
  required: { value: true, message: 'Email required.' },
  pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: 'The email address is invalid.' }
}

const password: RegisterOptions = {
  required: { value: true, message: 'Password required.' },
  minLength: { value: 8, message: 'Minimum password 8 characters.' }
}

const confirmPassword = (watch: UseFormWatch<FormInputsSignup>): RegisterOptions => {
  const validation: RegisterOptions = {
    required: { value: true, message: 'Password required.' },
    minLength: { value: 8, message: 'Minimum password 8 characters.' },
    validate: (value) => {
      if (watch('rePassword') !== value) {
        return 'Your passwords do no match.'
      }
    }
  }

  return validation
}

const confirmChangePassword = (watch: UseFormWatch<FormInputsChangePassword>): RegisterOptions => {
  const validation: RegisterOptions = {
    required: { value: true, message: 'Password required.' },
    minLength: { value: 8, message: 'Minimum password 8 characters.' },
    validate: (value) => {
      if (watch('newPassword') !== value) {
        return 'Your passwords do no match.'
      }
    }
  }

  return validation
}

const confirmChangeUsername = (oldUsername: string): RegisterOptions => {
  const validation: RegisterOptions = {
    required: { value: true, message: 'New username required.' },
    minLength: { value: 5, message: 'Username must be over 5 characters.' },
    validate: (value) => {
      if (oldUsername === value) {
        return 'Not the old username.'
      }
    }
  }

  return validation
}

const standard: RegisterOptions = {
  required: { value: true, message: 'Required.' }
}

export const formValidation = { email, password, confirmPassword, confirmChangePassword, standard, confirmChangeUsername }

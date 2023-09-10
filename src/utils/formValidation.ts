import type { UseFormWatch, RegisterOptions } from 'react-hook-form'
import type { FormInputsSignup, FormInputsChangePassword } from '../types'

const standard: RegisterOptions = {
  required: { value: true, message: 'Required.' }
}

const email: RegisterOptions = {
  required: { value: true, message: 'Email required.' },
  pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: 'The email address is invalid.' }
}

const password: RegisterOptions = {
  required: { value: true, message: 'Password required.' },
  minLength: { value: 8, message: 'Minimum password 8 characters.' }
}

const validatePasswordRegex = (value: string): string => {
  const regexUppercase = /[A-Z]/
  const regexLowercase = /[a-z]/
  const regexDigit = /\d/
  const regexSpecialChar = /[@#$%^&+=!*]/

  const isUppercaseValid = regexUppercase.test(value)
  const isLowercaseValid = regexLowercase.test(value)
  const isDigitValid = regexDigit.test(value)
  const isSpecialCharValid = regexSpecialChar.test(value)

  let passwordStatus: keyof typeof PasswordStatusMessage = 'None'

  enum PasswordStatusMessage {
    None = '',
    Number = 'Number',
    Uppercase = 'Uppercase letter',
    Lowercase = 'Lowercase letter',
    SpecialCharacter = 'Special character'
  }

  if (!isUppercaseValid) passwordStatus = 'Uppercase'
  else if (!isLowercaseValid) passwordStatus = 'Lowercase'
  else if (!isDigitValid) passwordStatus = 'Number'
  else if (!isSpecialCharValid) passwordStatus = 'SpecialCharacter'
  else passwordStatus = 'None'

  return PasswordStatusMessage[passwordStatus]
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
    ...password,
    validate: (value) => {
      if (watch('newPassword') !== value) {
        return 'Your passwords do no match.'
      }

      if (watch('oldPassword') === value) {
        return 'New password, not like old one.'
      }

      if (validatePasswordRegex(value).length > 0) {
        return `Password must contain at least one:/${validatePasswordRegex(value)}.`
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

export const formValidation = {
  email,
  standard,
  password,
  confirmPassword,
  confirmChangePassword,
  confirmChangeUsername
}

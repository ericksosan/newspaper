import type { RegisterOptions } from 'react-hook-form'

const email: RegisterOptions = {
  required: { value: true, message: 'Email required.' },
  pattern: { value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, message: 'The email address is invalid.' }
}

const password: RegisterOptions = {
  required: { value: true, message: 'Password required.' },
  minLength: { value: 8, message: 'Minimum password 8 characters.' }
}

export const formValidation = { email, password }

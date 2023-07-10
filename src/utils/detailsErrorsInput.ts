import type { FieldErrors } from 'react-hook-form'

interface DetailsError {
  message: string
  isInvalid: boolean
}

export const detailsErrorsInput = (errors: FieldErrors, name: string): DetailsError => {
  const filter = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] })
    }, { error: { message: '' } })

  const isInvalid = Object.keys(errors).length > 0
  const message = filter.error?.message

  return { message, isInvalid }
}
import type { FieldErrors } from 'react-hook-form'

interface DetailsError {
  message: string
  isInvalid: boolean
}

/**
 * The function `detailsErrorsInput` takes in an object of errors and a name,
 * filters the errors based on the name, and returns a message and a boolean
 * indicating if there are any errors.
 * @param {FieldErrors} errors - The `errors` parameter is an object that contains
 * error messages for different fields. It is of type `FieldErrors`.
 * @param {string} name - The `name` parameter is a string that represents the name
 * of the field for which you want to retrieve the errors.
 * @returns an object with two properties: "message" and "isInvalid".
 */
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

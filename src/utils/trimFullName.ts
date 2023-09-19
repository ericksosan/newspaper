export const trimFullName = (fullname: string): string => {
  const parts = fullname.split(' ').filter(part => !part.includes('.'))

  if (parts.length > 1) {
    const firstname = parts[0]
    const lastname = parts[parts.length - 1]

    fullname = `${firstname} ${lastname}`

    return fullname
  }

  return fullname
}

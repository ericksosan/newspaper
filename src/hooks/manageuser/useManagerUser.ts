import { useState, useEffect } from 'react'
import { type UserDetails, getAllUsers } from '../../firebase/database/users'

interface UseManagerUser {
  isLoading: boolean
  listUsers: UserDetails[]
}

export const useManagerUser = (): UseManagerUser => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [listUsers, setListUsers] = useState<UserDetails[]>([{} as UserDetails] as UserDetails[])

  useEffect(() => {
    getAllUsers()
      .then(setListUsers)
      .catch(_err => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  return {
    isLoading,
    listUsers
  }
}

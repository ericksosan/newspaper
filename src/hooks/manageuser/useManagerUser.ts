import { useState, useEffect } from 'react'
import { useAuth } from '../../firebase/hooks/useAuth'
import { type UserDetails, getAllUsers } from '../../firebase/database/users'

interface UseManagerUser {
  isLoading: boolean
  listUsers: UserDetails[]
}

export const useManagerUser = (): UseManagerUser => {
  const { user: { id } } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [listUsers, setListUsers] = useState<UserDetails[]>([{} as UserDetails] as UserDetails[])

  useEffect(() => {
    getAllUsers(id)
      .then(users => { setListUsers(users) })
      .catch(_err => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  return {
    isLoading,
    listUsers
  }
}

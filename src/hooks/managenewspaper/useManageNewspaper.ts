import { useState, useEffect } from 'react'
import { type NewspaperAllDetails, getNewspaperByWritter } from '../../firebase/database/newspaper'
import { useAuth } from '../../firebase/hooks/useAuth'

interface UseManageNewspaper {
  isLoading: boolean
  newspaper: NewspaperAllDetails[]
}

export const useManageNewspaper = (): UseManageNewspaper => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([] as NewspaperAllDetails[])
  const { user: { id } } = useAuth()

  useEffect(() => {
    void fetchNewspaperByWritter()
  }, [])

  const fetchNewspaperByWritter = async (): Promise<void> => {
    try {
      const res = await getNewspaperByWritter(id)
      setNewspaper(res)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    newspaper
  }
}

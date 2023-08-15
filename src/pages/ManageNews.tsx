import { useState, useEffect } from 'react'
import { CardNews } from '../components/CardNews'
import { getNewspaperByWritter, type NewspaperAllDetails } from '../firebase/database/newspaper'
import { Loading } from '../components/Loading'
import { useAuth } from '../firebase/hooks/useAuth'

export const ManageNews = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [newspaper, setNewspaper] = useState([] as NewspaperAllDetails[])
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

  if (isLoading) return <Loading />

  return (
    <div className="lg:max-w-7xl lg:mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10 font-montserrat">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">News Management</h1>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {
          newspaper.map((news) => (
            <CardNews key={news.id} newspaperDetails={news}/>
          ))
        }
      </div>
    </div>
  )
}

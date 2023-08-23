import { useState, useEffect } from 'react'
import { useAuth } from '../../firebase/hooks/useAuth'
import { getNewspaperByWritter, type NewspaperAllDetails } from '../../firebase/database/newspaper'
import { CardManageNewspaper, SkeletonCardManageNewspaper } from '../organisms'
import { Container, Title } from '../atoms'

export const ManageNewspaper = (): JSX.Element => {
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

  return (
    <Container>
      <Title className='font-bold text-lg md:text-4xl dark:text-gray-200 py-4 font-montserrat'>
        News Management
      </Title>
      <div className="grid place-items-center sm:place-items-stretch gap-4
        sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {
          isLoading
            ? Array(8).fill('').map((_item, i) => (<SkeletonCardManageNewspaper key={i}/>))
            : newspaper.map((news) => (
              <CardManageNewspaper key={news.id} {...news} />
            ))
        }
      </div>
    </Container>
  )
}

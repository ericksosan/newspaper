import { useState, useEffect, useMemo } from 'react'
import { getGreeting } from '../../utils'
import { useAuth } from '../../firebase/hooks/useAuth'
import { News, Pagination } from '../molecules'
import { Container, Title } from '../atoms'
import { getAllNewspaper, type NewspaperAllDetails } from '../../firebase/database/newspaper'

const Home = (): JSX.Element => {
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { user: { fullname } } = useAuth()

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 })

    setIsLoading(true)

    getAllNewspaper(currentPage)
      .then((data) => {
        setNewspaper(data)
        setIsLoading(false)
      })
      .catch(_err => { })
      .finally(() => { setIsLoading(false) })
  }, [currentPage])

  const handlerCurrentPage = (current: number): void => {
    setCurrentPage(current)
  }

  const greeting = useMemo(() => (
    <Title className='text-xl md:text-4xl pb-4 line-clamp-2 md:line-clamp-none'>
      {getGreeting(fullname ?? '')}
    </Title>
  ), [fullname])

  return (
    <Container>

      {greeting}

      <News
        isLoading={isLoading}
        newspaper={newspaper}
        placerholderQuantity={10} />

      <Pagination
        currentPage={currentPage}
        handlerCurrentPage={handlerCurrentPage}
      />

    </Container>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'
import { getGreeting } from '../../utils'
import { useAuth } from '../../firebase/hooks/useAuth'
import { News } from '../molecules'
import { Container, Title } from '../atoms'
import { type DataNewspaper, getAllNewspaper } from '../../firebase/database/newspaper'

export const Home = (): JSX.Element => {
  const [dataNewspaper, setDataNewspaper] = useState({ allNewspaper: [], totalNewspaper: 0 } as DataNewspaper)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { allNewspaper, totalNewspaper } = dataNewspaper

  useEffect(() => {
    getAllNewspaper(currentPage)
      .then(res => { setDataNewspaper(res) })
      .catch(_err => { })
      .finally(() => { setIsLoading(false) })
  }, [currentPage])

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const { user: { fullname } } = useAuth()

  return (
    <Container>
      <Title className='font-bold text-lg md:text-4xl dark:text-gray-200 py-4 font-montserrat'>
        {getGreeting(fullname ?? '')}
      </Title>
      <News isLoading={isLoading} newspaper={allNewspaper} />
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalNewspaper}
        className='grid place-items-center mt-8'
      />
    </Container>
  )
}

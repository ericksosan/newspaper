import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'
import { getGreeting } from '../../utils'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading, News } from '../molecules'
import { Container, Title } from '../atoms'
import { type DataNewspaper, getAllNewspaper } from '../../firebase/database/newspaper'

const Home = (): JSX.Element => {
  const [dataNewspaper, setDataNewspaper] = useState({ allNewspaper: [], totalNewspaper: 1 } as DataNewspaper)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { user: { fullname } } = useAuth()
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

  if (isLoading) return <Loading />

  return (
    <Container>
      <Title className='text-xl md:text-4xl pb-4 line-clamp-2 md:line-clamp-none'>
        {getGreeting(fullname ?? '')}
      </Title>
      <News isLoading={isLoading} newspaper={allNewspaper} />
      <Pagination
        showIcons
        currentPage={currentPage}
        layout="navigation"
        onPageChange={onPageChange}
        totalPages={totalNewspaper === 0 ? 1 : totalNewspaper}
        className='grid place-items-center my-4 font-inter'
      />
    </Container>
  )
}

export default Home

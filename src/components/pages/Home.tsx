import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'
import { getGreeting } from '../../utils'
import { useAuth } from '../../firebase/hooks/useAuth'
import { News } from '../molecules'
import { Title } from '../atoms'
import { type DataNewspaper, getAllNewspaper } from '../../firebase/database/newspaper'

export const Home = (): JSX.Element => {
  const [dataNewspaper, setDataNewspaper] = useState({ allNewspaper: [], totalNewspaper: 0 } as DataNewspaper)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { allNewspaper, totalNewspaper } = dataNewspaper

  useEffect(() => {
    getAllNewspaper(currentPage)
      .then(res => { setDataNewspaper(res) })
      .catch(err => { console.log(err) })
      .finally(() => { setIsLoading(false) })
  }, [currentPage])

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const { user: { fullname } } = useAuth()

  return (
    <div className='min-h-screen px-5 2xl:px-10 font-montserrat'>
      <section className="text-gray-600 body-font overflow-hidden py-10 mx-auto
      max-w-7xl 2xl:max-w-full">
        <Title className='text-xl md:text-2xl xl:text-4xl font-bold mb-8'>
          {getGreeting(fullname ?? '')}
        </Title>
        <News isLoading={isLoading} newspaper={allNewspaper} />
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalNewspaper}
          className='grid place-items-center mt-8'
        />
      </section>
    </div>
  )
}

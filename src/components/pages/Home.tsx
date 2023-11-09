import { useState, useEffect } from 'react'
import { getGreeting } from '../../utils'
import { useAuth } from '../../firebase/hooks/useAuth'
import { Loading, News, Pagination } from '../molecules'
import { Container, Title } from '../atoms'
import { getAllNewspaper, type NewspaperAllDetails } from '../../firebase/database/newspaper'
import { ModalChangeProfilePicture } from '../organisms'

const Home = (): JSX.Element => {
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { user: { fullname }, handleIsModalProfileOpen, isModalProfileOpen } = useAuth()

  useEffect(() => {
    document.querySelector('body')?.classList.toggle('overflow-hidden', isModalProfileOpen)
  }, [isModalProfileOpen])

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

  const handlerCloseModal = (): void => {
    localStorage.removeItem('showModalProfilePicture')
    handleIsModalProfileOpen(false)
  }

  if (isLoading) return <Loading />

  return (
    <Container>

      <Title className='text-xl md:text-4xl pb-4'>
        {getGreeting(fullname ?? '')}
      </Title>

      <News
        isLoading={isLoading}
        newspaper={newspaper}
        placerholderQuantity={10} />

      <Pagination
        currentPage={currentPage}
        handlerCurrentPage={handlerCurrentPage}
      />

      {
        isModalProfileOpen &&
        <ModalChangeProfilePicture handlerCloseModal={handlerCloseModal} />
      }

    </Container>
  )
}

export default Home

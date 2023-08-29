import { CardManageNewspaper, ManagerNewspaperNotItems, SkeletonCardManageNewspaper } from '../organisms'
import { CardContainer, Container, Title } from '../atoms'
import { ManageNewspaperContext } from '../../contexts'
import { useContext, useEffect, useState } from 'react'
import { getNewspaperByWritter, type NewspaperAllDetails } from '../../firebase/database/newspaper'
import { useAuth } from '../../firebase/hooks/useAuth'

const ManageNewspaper = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newspaper, setNewspaper] = useState<NewspaperAllDetails[]>([] as NewspaperAllDetails[])
  const { user: { id } } = useAuth()
  const { updateChange } = useContext(ManageNewspaperContext)

  useEffect(() => {
    getNewspaperByWritter(id)
      .then((res) => { setNewspaper(res) })
      .catch((_err) => { })
      .finally(() => { setIsLoading(false) })
  }, [updateChange])

  if (newspaper.length === 0 && !isLoading) return <ManagerNewspaperNotItems />

  return (
      <Container>
        <Title className='text-lg md:text-4xl py-4 font-montserrat'>
          News Management
        </Title>
        <CardContainer>
          {
            isLoading
              ? Array(8).fill('').map((_item, i) => (<SkeletonCardManageNewspaper key={i} />))
              : newspaper.map((news) => (
                <CardManageNewspaper key={news.id} {...news} />
              ))
          }
        </CardContainer>
      </Container>
  )
}

export default ManageNewspaper

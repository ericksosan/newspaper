import { useContext, useEffect, useState } from 'react'
import { CardContainer, Container, Title } from '../atoms'
import { ManageNewspaperContext } from '../../contexts'
import { CardManageNewspaper, ManagerNewspaperNotItems, SkeletonCardManageNewspaper } from '../organisms'
import { getNewspaperByWritter } from '../../firebase/database/newspaper'
import { useAuth } from '../../firebase/hooks/useAuth'

const ManageNewspaper = (): JSX.Element => {
  const { user: { id } } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { newspaper, handleSetNewspaper } = useContext(ManageNewspaperContext)

  useEffect(() => {
    getNewspaperByWritter(id)
      .then((res) => { handleSetNewspaper(res) })
      .catch((_err) => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  if (newspaper.length === 0 && !isLoading) return <ManagerNewspaperNotItems />

  return (
    <Container>
      <Title className='text-lg md:text-4xl pb-4 font-montserrat'>
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

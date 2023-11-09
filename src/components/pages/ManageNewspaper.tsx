import { useContext, useMemo } from 'react'
import { CardContainer, Container, Title } from '../atoms'
import { ManageNewspaperContext } from '../../contexts'
import { CardManageNewspaper, ManagerNewspaperNotItems, SkeletonCardManageNewspaper } from '../organisms'

const ManageNewspaper = (): JSX.Element => {
  const { newspaper, isLoading, itemsNotFound } = useContext(ManageNewspaperContext)

  const listManageNewspaper = useMemo(() => (newspaper.map((news) => (
    <CardManageNewspaper key={news.id} {...news} />
  ))), [newspaper])

  return (
    (itemsNotFound || newspaper.length === 0) && !isLoading
      ? <ManagerNewspaperNotItems />
      : <Container>
        <Title className='text-lg md:text-4xl pb-4 font-montserrat'>
          News Management
        </Title>
        <CardContainer>
          {
            isLoading
              ? Array(8).fill('').map((_item, i) => (<SkeletonCardManageNewspaper key={i} />))
              : listManageNewspaper
          }
        </CardContainer>
      </Container>
  )
}

export default ManageNewspaper

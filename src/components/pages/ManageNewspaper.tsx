import { CardManageNewspaper, ManagerNewspaperNotItems, SkeletonCardManageNewspaper } from '../organisms'
import { CardContainer, Container, Title } from '../atoms'
import { useManageNewspaper } from '../../hooks'

export const ManageNewspaper = (): JSX.Element => {
  const { isLoading, newspaper } = useManageNewspaper()

  if (newspaper.length === 0 && !isLoading) return <ManagerNewspaperNotItems/>

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

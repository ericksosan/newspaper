import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { CardContainer } from '../../atoms'
import { CardNewspaper, SkeletonCardNewspaper } from '../../organisms'

interface NewsProps {
  isLoading: boolean
  newspaper: NewspaperAllDetails[]
}

export const News: React.FC<NewsProps> = ({ isLoading = true, newspaper }) => {
  return (
    <CardContainer>
      {
        isLoading
          ? Array(6).fill('').map((_item, index) => (<SkeletonCardNewspaper key={index} />))
          : newspaper.map((news) => (
            <CardNewspaper key={news.id} {...news} />
          ))
      }
    </CardContainer>
  )
}

import { useMemo, memo } from 'react'
import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { CardContainer } from '../../atoms'
import { CardNewspaper, SkeletonCardNewspaper } from '../../organisms'

interface NewsProps {
  isLoading: boolean
  newspaper: NewspaperAllDetails[]
  placerholderQuantity: number
}

export const News: React.FC<NewsProps> = memo(({ isLoading = true, newspaper, placerholderQuantity }) => {
  const listNewspaper = useMemo(() => newspaper.map((news) => (<CardNewspaper key={news.id} {...news} />)), [newspaper])

  return (
    <CardContainer>
      {
        isLoading
          ? Array(placerholderQuantity).fill('').map((_item, index) => (<SkeletonCardNewspaper key={index} />))
          : listNewspaper
      }
    </CardContainer>
  )
}
)

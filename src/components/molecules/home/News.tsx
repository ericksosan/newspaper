import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { CardNewspaper, SkeletonCardNewspaper } from '../../organisms'

interface NewsProps {
  isLoading: boolean
  newspaper: NewspaperAllDetails[]
}

export const News: React.FC<NewsProps> = ({ isLoading = true, newspaper }) => {
  return (
    <div className="grid place-items-center sm:place-items-stretch gap-4
      sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-h-screen">
      {
        isLoading
          ? Array(6).fill('').map((_item, index) => (<SkeletonCardNewspaper key={index} />))
          : newspaper.map((news) => (
            <CardNewspaper key={news.id} {...news} />
          ))
      }
    </div>
  )
}

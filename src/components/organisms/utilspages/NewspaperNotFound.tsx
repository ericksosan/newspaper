import { useEffect, useState } from 'react'
import { Container, Divider, Title } from '../../atoms'
import { News } from '../../molecules'
import { getSuggestions, type NewspaperAllDetails } from '../../../firebase/database/newspaper'

export const NewspaperNotFound = (): JSX.Element => {
  const [suggestions, setSuggestions] = useState<NewspaperAllDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    getSuggestions()
      .then((data) => {
        setSuggestions(data)
        setIsLoading(false)
      })
      .catch(() => { })
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <Container>
      <div className="flex gap-10 md:gap-0 mt-10 md:justify-between flex-col lg:flex-row-reverse md:mt-0 min-h-screen pb-40">
        <img src="/images/newspaper_not_found.svg"
          alt="Newspaper Not Found"
          className="w-full md:w-1/2 animate-fade-left animate-delay-150 animate-ease-in-out" />
        <div className="flex justify-center items-center md:w-full">
          <div className="flex flex-col animate-fade-right animate-delay-300 animate-ease-in-out">
            <Title className="text-2xl text-slate-900 font-inter ">
              Sorry,
            </Title>
            <h2 className="text-4xl font-bold text-slate-900 font-inter dark:text-white">Newspaper</h2>
            <h3 className="text-6xl font-bold text-azure-radiance-700 ">
              Not Found<span className='text-slate-900 dark:text-white'>.</span>
            </h3>
          </div>
        </div>
      </div>

      <section className='flex flex-col md:pb-10'>
        <h2 className="text-xl lg:text-4xl text-center font-inter font-bold dark:text-white">
          You may be interested in this news
        </h2>
        <Divider className='w-full mt-4 mb-8' />
        <News
          isLoading={isLoading}
          newspaper={suggestions}
          placerholderQuantity={10} />
      </section>
    </Container>
  )
}

import { useState, useEffect } from 'react'
import { Pagination } from 'flowbite-react'
import { getGreeting } from '../utils'
import { getAllNewspaper, type DataNewspaper } from '../firebase/database/newspaper'
import { Loading } from '../components/Loading'
import { useAuth } from '../firebase/hooks/useAuth'
import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => {
  const [dataNewspaper, setDataNewspaper] = useState({ allNewspaper: [], totalNewspaper: 0 } as DataNewspaper)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1)
  const { user: { fullname } } = useAuth()

  useEffect(() => {
    void fetchAllNewspaper()
  }, [currentPage])

  const onPageChange = (page: number): void => {
    setCurrentPage(page)
  }

  const fetchAllNewspaper = async (): Promise<void> => {
    try {
      setIsLoading(true)
      const res = await getAllNewspaper(currentPage)
      setDataNewspaper(res)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />

  const { allNewspaper, totalNewspaper } = dataNewspaper

  return (
    <div className='min-h-screen px-5 font-montserrat'>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="py-10 mx-auto max-w-7xl">
          <h1 className='text-slate-800 text-xl md:text-2xl xl:text-4xl font-bold mb-8 dark:text-white'>{getGreeting(fullname ?? '')} </h1>

          <div
            className="grid place-items-center gap-4
            sm:grid-cols-2 lg:grid-cols-3 grid-flow-row">

            {
              allNewspaper.map(({ cover, title, id, nameWritter, readingTimeText, summary, createdAt, avatarWritter }) => (
                <Link
                  key={id}
                  to={`/new/${id}`}
                  className="flex flex-col items-center bg-white border overflow-hidden border-gray-200 dark:hover:bg-slate-900
                  transition-colors duration-300 ease-out rounded-lg dark:border-gray-700 dark:bg-slate-800 [&>div>h5]:hover:text-azure-radiance-700
                  dark:[&>div>h5]:hover:text-gray-300 [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out
                  w-full sm:w-full sm:py-6 shadow">

                  <div className="flex flex-col justify-between p-6 gap-4 sm:py-0">

                    <img
                      className="object-cover hidden sm:flex h-52 w-full rounded-md"
                      src={cover} />

                    <div className="inline-flex items-center">
                      <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img alt={nameWritter} src={avatarWritter} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow flex flex-col pl-4">
                        <div className="title-font font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
                          <span>{nameWritter}</span>
                        </div>
                        <span className="text-gray-400 text-xs tracking-widest mt-0.5">{createdAt}</span>
                      </div>

                    </div>

                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white md:text-xl">{title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 text-sm md:text-md">{summary}</p>
                    <span className="dark:text-gray-400 text-sm">{readingTimeText}</span>
                  </div>
                </Link>
              ))
            }

          </div>
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalNewspaper}
            className='grid place-items-center mt-8'
          />
        </div>
        {/* <aside className="py-10 px-4 mx-auto max-w-lg hidden lg:flex">
          <div className="">
            <div className="flex flex-col shadow bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 p-4 pb-0 ">
              <h1 className="text-slate-900 dark:text-white font-bold text-2xl border-b-2 border-b-gray-100 dark:border-b-slate-700 pb-4">Most Highlighted</h1>
              <div className="divide-y-2 divide-gray-100 dark:divide-slate-700 flex flex-col gap-2">

                <a href="#" className="flex flex-col items-centerrounded-lg md:flex-row md:max-w-xl py-4 [&>div>h5]:hover:text-azure-radiance-700 dark:[&>div>h5]:hover:text-gray-400 [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out">
                  <div className="flex flex-col justify-between leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </a>

                <a href="#" className="flex flex-col items-centerrounded-lg md:flex-row md:max-w-xl py-4 [&>div>h5]:hover:text-azure-radiance-700 dark:[&>div>h5]:hover:text-gray-400 [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out">
                  <div className="flex flex-col justify-between leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </a>

                <a href="#" className="flex flex-col items-centerrounded-lg md:flex-row md:max-w-xl py-4 [&>div>h5]:hover:text-azure-radiance-700 dark:[&>div>h5]:hover:text-gray-400 [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out">
                  <div className="flex flex-col justify-between leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </a>

                <a href="#" className="flex flex-col items-centerrounded-lg md:flex-row md:max-w-xl py-4 [&>div>h5]:hover:text-azure-radiance-700 dark:[&>div>h5]:hover:text-gray-400 [&>div>h5]:transition-colors [&>div>h5]:duration-300 [&>div>h5]:ease-out">
                  <div className="flex flex-col justify-between leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </aside> */}
      </section>

    </div>
  )
}

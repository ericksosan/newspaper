import { useEffect, useMemo, useState } from 'react'
import { pagesPagination } from '../../../utils'
import { getTotalPages } from '../../../firebase/database/newspaper'
import { Button, Spinner } from '../../atoms'
import { NextIcon, PreviousIcon } from '../../atoms/icon'
import { Pages } from '..'

interface PaginationProps {
  currentPage: number
  handlerCurrentPage: (currentPage: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, handlerCurrentPage }) => {
  const [isTotalPagesLoading, setIsTotalPagesLoading] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    setIsTotalPagesLoading(true)

    getTotalPages()
      .then(setTotalPages)
      .catch(() => { })
      .finally(() => { setIsTotalPagesLoading(false) })
  }, [])

  const pages = useMemo(() => pagesPagination(totalPages), [totalPages])

  const previousPage = (): void => {
    handlerCurrentPage(currentPage - 1)
  }

  const nextPage = (): void => {
    handlerCurrentPage(currentPage + 1)
  }

  return (
    <section className="py-4 mt-4 min-w-full flex items-center justify-center">
      {
        isTotalPagesLoading
          ? <Spinner />
          : <div className="flex flex-row gap-2 font-inter font-medium items-center">
            {
              currentPage !== 1 &&
              <Button
                onClick={previousPage}
                className="btn-pagination">
                <PreviousIcon />
              </Button>
            }

            <Pages
              currentPage={currentPage}
              handlerCurrentPage={handlerCurrentPage}
              pages={pages}
            />

            {
              currentPage !== totalPages &&
              <Button
                onClick={nextPage}
                className="btn-pagination">
                <NextIcon />
              </Button>
            }
          </div>
      }
    </section>
  )
}

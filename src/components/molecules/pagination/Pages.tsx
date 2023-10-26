import { useMemo } from 'react'
import type { Pages as IPages } from '../../../types'
import { Page } from '../../atoms'

interface PagesProps {
  pages: IPages[]
  handlerCurrentPage: (page: number) => void
  currentPage: number
}

export const Pages: React.FC<PagesProps> = ({ pages, currentPage, handlerCurrentPage }) => {
  const pagesList = useMemo(() => (
    pages.map(({ page }) => (
      <Page
        key={page}
        page={page}
        currentPage={currentPage}
        handlerCurrentPage={handlerCurrentPage}
      />
    ))
  ), [pages, currentPage])

  return (
    <ul className="flex flex-row gap-2 items-center">
      {pagesList}
    </ul>
  )
}

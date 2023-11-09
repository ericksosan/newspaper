import type { Pages } from '../types'

export const pagesPagination = (endPage: number): Pages[] => {
  const pages: Pages[] = []

  const end = endPage < 5 ? endPage : 5

  for (let page = 0; page < end; page++) {
    pages.push({ page: page + 1 })
  }

  return pages
}

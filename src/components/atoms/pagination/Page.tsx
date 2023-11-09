import { twMerge } from 'tailwind-merge'

interface PageProps {
  page: number
  handlerCurrentPage: (page: number) => void
  currentPage: number
}

export const Page: React.FC<PageProps> = ({ page, currentPage, handlerCurrentPage }) => {
  return (
    <li
      key={page}
      onClick={() => { handlerCurrentPage(page) }}
      className={twMerge(
        'btn-pagination select-none cursor-pointer transition-colors duration-300 ease-linear',
        currentPage === page &&
        `!border-slate-800 dark:!border-white !bg-azure-radiance-700
        !text-white dark:!bg-azure-radiance-700 dark:!text-white`
      )}>
      {page}
    </li>
  )
}

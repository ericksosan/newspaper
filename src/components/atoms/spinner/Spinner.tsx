import { twMerge } from 'tailwind-merge'

export const Spinner = ({ className }: { className?: string }): JSX.Element => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      className={
        twMerge(
          'animate-spin animate-duration-500 animate-ease-linear text-slate-900 dark:text-white w-6 h-6',
          className
        )
      }
      viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9"></path>
      <path d="M17 12a5 5 0 1 0 -5 5"></path>
    </svg>
  )
}

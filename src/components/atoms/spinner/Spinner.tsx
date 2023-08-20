import { twMerge } from 'tailwind-merge'

export const Spinner = ({ className }: { className?: string }): JSX.Element => {
  return (
    <span
      className={twMerge(
        `w-6 h-6 rounded-full inline-block border-t border-t-white border-l
        border-l-transparent box-border animate-spin duration-300 ease-linear`,
        className
      )}
      />
  )
}

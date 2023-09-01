import { twMerge } from 'tailwind-merge'

export const Divider = ({ className }: { className?: string }): JSX.Element => {
  return (
    <hr
      className={
        twMerge(
          'inline-block border w-2/4 border-slate-200 dark:border-slate-800',
          className
        )
      }
    />
  )
}

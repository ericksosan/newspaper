import { twMerge } from 'tailwind-merge'

export const SkeletonElement = ({ className }: { className: string }): JSX.Element => {
  return (
    <div className={
      twMerge(
        'bg-gray-200 rounded-full dark:bg-gray-700',
        className
      )
    }
    />
  )
}

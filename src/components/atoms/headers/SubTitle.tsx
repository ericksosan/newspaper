import { twMerge } from 'tailwind-merge'

interface SubTitleProps {
  children: React.ReactNode
  className?: string
}

export const SubTitle: React.FC<SubTitleProps> = ({ children, className }) => {
  return (
    <span
    className={
      twMerge(
        'inline-block font-regular text-slate-900 dark:text-gray-200',
        className
      )
    }
    >
      {children}
    </span>
  )
}

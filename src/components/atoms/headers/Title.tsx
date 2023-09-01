import { twMerge } from 'tailwind-merge'

interface TitleProps {
  children: React.ReactNode
  className?: string
}

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1
    className={
      twMerge(
        'inline-block font-montserrat font-bold text-slate-900 dark:text-white',
        className
      )
    }
    >
      {children}
    </h1>
  )
}

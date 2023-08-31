import { twMerge } from 'tailwind-merge'

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

export const CardContainer: React.FC<CardContainerProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen">
      <div className={
        twMerge(
          `grid place-items-center sm:place-items-stretch gap-4
        sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-rows-1`,
          className
        )
      }>
        {children}
      </div>
    </div>
  )
}

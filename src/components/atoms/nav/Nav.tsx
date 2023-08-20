import { twMerge } from 'tailwind-merge'

interface NavProps {
  children: React.ReactNode
  className?: string
}

export const Nav: React.FC<NavProps> = ({ children, className }) => {
  return (
    <nav
      className={
        twMerge(
          'h-16 w-full flex justify-between items-center px-10 font-montserrat',
          className
        )
      }
    >
      {children}
    </nav>
  )
}

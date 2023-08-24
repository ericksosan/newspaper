interface CardContainerProps {
  children: React.ReactNode
}

export const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div className="grid place-items-center sm:place-items-stretch gap-4
      sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-h-screen grid-rows-1">
      {children}
    </div>
  )
}

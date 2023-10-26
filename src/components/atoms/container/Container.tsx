interface ContainerProps {
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="overflow-hidden py-8 md:py-6 mx-auto max-w-full
    px-5 md:px-10 flex flex-col gap-2 min-h-screen">
      {children}
    </div>
  )
}

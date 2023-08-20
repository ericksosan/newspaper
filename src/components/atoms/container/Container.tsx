interface ContainerProps {
  children: React.ReactNode
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="pt-16">{children}</div>
  )
}

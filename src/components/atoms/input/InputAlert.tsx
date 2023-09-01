export const InputAlert = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <p className="mt-2 absolute -top-10 right-0 text-sm text-red-600 lg:font-semibold
      xl:text-md animate-fade-up animate-duration-300 animate-ease-in-out"
    >{ children }</p>
  )
}

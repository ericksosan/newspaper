import { DropdownContext, type DropdownContextValues } from './DropdownContext.ts'

interface DropdownProviderProps {
  children: React.ReactNode
  ValueProvider: DropdownContextValues
}

export const DropdownProvider: React.FC<DropdownProviderProps> = ({ children, ValueProvider }) => {
  return (
    <DropdownContext.Provider value={ValueProvider}>
      { children }
    </DropdownContext.Provider>
  )
}

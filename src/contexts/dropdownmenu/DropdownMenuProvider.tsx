import { useState } from 'react'
import { type DropdownMenuContextValues, DropdownMenuContext } from '.'

interface DropdownMenuProviderProps {
  children: React.ReactNode
}

export const DropdownMenuProvider: React.FC<DropdownMenuProviderProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleIsDropdownOpen = (status: boolean): void => {
    setIsDropdownOpen(status)
  }
  const values: DropdownMenuContextValues = {
    isDropdownOpen,
    handleIsDropdownOpen
  }

  return (
    <DropdownMenuContext.Provider value={values}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

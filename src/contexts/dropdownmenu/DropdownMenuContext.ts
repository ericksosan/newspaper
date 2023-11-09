import { createContext } from 'react'

export interface DropdownMenuContextValues {
  isDropdownOpen: boolean
  handleIsDropdownOpen: (status: boolean) => void
}

export const DropdownMenuContext = createContext<DropdownMenuContextValues>({} as DropdownMenuContextValues)

import { createContext } from 'react'

export interface DropdownContextValues {
  isDropdownActive: boolean
  handleDropdownActive: () => void
}

const initialDropdownContext = {
  isDropdownActive: false,
  handleDropdownActive: (): void => {}
}

export const DropdownContext = createContext<DropdownContextValues>(initialDropdownContext)

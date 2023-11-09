import { createContext } from 'react'
import type { FormMarkdownEditor } from '../../types'
import type { NewspaperAllDetails } from '../../firebase/database/newspaper'

export interface ManageNewspaperContextValues {
  isLoading: boolean
  itemsNotFound: boolean
  newspaper: NewspaperAllDetails[]
  onUpdateNewspaper: (id: string, data: FormMarkdownEditor) => void
  onDeleteNewspaper: (id: string) => void
}

export const ManageNewspaperContext = createContext<ManageNewspaperContextValues>({} as ManageNewspaperContextValues)

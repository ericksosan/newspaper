import { createContext } from 'react'
import type { Alert, FormMarkdownEditor } from '../../types'
import type { UseFormRegister } from 'react-hook-form'

export interface ManageNewspaperContextValues {
  alert: Alert
  message: string
  isLoading: boolean
  updateChange: boolean
  handleFillField: (id: string) => void
  register: UseFormRegister<FormMarkdownEditor>
  handleDeletePostNewspaper: (id: string) => void
  handleUpdatePostNewspaper: (id: string) => void
}

export const ManageNewspaperContext = createContext<ManageNewspaperContextValues>({ } as ManageNewspaperContextValues)

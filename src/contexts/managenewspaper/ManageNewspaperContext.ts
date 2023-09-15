import { createContext } from 'react'
import type { FormMarkdownEditor, ImageFileStatus } from '../../types'
import type { UseFormRegister } from 'react-hook-form'
import type { NewspaperAllDetails } from '../../firebase/database/newspaper'

export interface ManageNewspaperContextValues {
  imageFileStatus: ImageFileStatus
  newspaper: NewspaperAllDetails[]
  handleFillField: (id: string) => void
  register: UseFormRegister<FormMarkdownEditor>
  handleDeletePostNewspaper: (id: string) => void
  handleUpdatePostNewspaper: (id: string) => void
  handleSetNewspaper: (listNewspaper: NewspaperAllDetails[]) => void
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void

}

export const ManageNewspaperContext = createContext<ManageNewspaperContextValues>({} as ManageNewspaperContextValues)

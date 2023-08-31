import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import type { UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from 'react-hook-form'
import type { FormMarkdownEditor, ImageFileStatus } from '../../types'
import { uploadImageCover } from '../../firebase/storage/uploadImageCover'

interface UseMarkdownEditorForm {
  message: string
  changeModeCover: boolean
  selectFile: File | undefined
  imageFileStatus: ImageFileStatus
  reset: UseFormReset<FormMarkdownEditor>
  handleChangeModeCoverFileURL: () => void
  validateFormMarkdownEditor: () => boolean
  register: UseFormRegister<FormMarkdownEditor>
  setValue: UseFormSetValue<FormMarkdownEditor>
  handleSubmit: UseFormHandleSubmit<FormMarkdownEditor>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const useMarkdownEditorForm = (): UseMarkdownEditorForm => {
  const [message, setMessage] = useState<string>('')
  const [imageFileStatus, setImageFileStatus] = useState<ImageFileStatus>({ messageFile: '', isLoadingUpload: false })
  const [selectFile, setSelectFile] = useState<File | undefined>()
  const [changeModeCover, setChangeModeCover] = useState<boolean>(false)
  const { register, handleSubmit, control, setValue, reset } = useForm<FormMarkdownEditor>()
  const { cover, title, content } = useWatch<FormMarkdownEditor>({ control })

  const isURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i

  const validateFormMarkdownEditor = (): boolean => {
    if ((cover === '' || cover === undefined)) {
      setMessage('You must choose URL or Image file mode!')
      return false
    }

    if (cover !== '' && !isURL.test(cover ?? '')) {
      setMessage('The URL of the cover page is invalid!')
      return false
    }

    if (typeof title === 'undefined' || typeof content === 'undefined') {
      setMessage('Title and content are required fields!')
      return false
    }

    if (title === '' || content === '') {
      setMessage('The title and content cannot be empty!')
      return false
    }

    setMessage('')
    return true
  }

  const handleChangeModeCoverFileURL = (): void => {
    setChangeModeCover(!changeModeCover)
  }

  let prevName: string | undefined = ''
  const handleFileCoverChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    prevName = selectFile?.name

    if (file) {
      setSelectFile(file)

      if (file?.name === prevName) return

      setImageFileStatus(
        {
          messageFile: 'uploading...',
          isLoadingUpload: true
        }
      )
      uploadImageCover(file)
        .then((url) => {
          setValue('cover', url)
          setImageFileStatus(
            {
              messageFile: 'uploaded! ✅',
              isLoadingUpload: false
            }
          )
        })
        .catch(_err => {
          setImageFileStatus(
            {
              messageFile: 'error ❌',
              isLoadingUpload: false
            }
          )
        })
    }
  }

  return {
    reset,
    message,
    register,
    setValue,
    selectFile,
    handleSubmit,
    imageFileStatus,
    changeModeCover,
    handleFileCoverChange,
    validateFormMarkdownEditor,
    handleChangeModeCoverFileURL
  }
}

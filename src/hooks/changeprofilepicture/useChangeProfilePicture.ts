import { useState } from 'react'
import { useAuth } from '../../firebase/hooks/useAuth'
import toast from 'react-hot-toast'
import { toastOptions } from '../../utils'
import { uploadImage } from '../../firebase/storage/uploadImage'
import { updateProfilePicture } from '../../firebase/database/users'
import { deleteImage } from '../../firebase/storage/deleteImage'
import { type EImageType } from 'image-conversion'

interface UseChangeProfilePicture {
  currentPicture: string | null
  errorPicture: string | null
  somethingChanged: boolean
  profilePicture: File | null
  handlerProfilePictureChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void
  handlerSaveChanges: () => void
  handlerCancelChangePicture: () => void
  handlerDeletePicture: () => void
}

export const useChangeProfilePicture = (): UseChangeProfilePicture => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [somethingChanged, setSomethingChanged] = useState(false)
  const { user: { id, photoURL }, handleUpdateLocalUserDatails, handleIsModalProfileOpen } = useAuth()
  const [currentPicture, setCurrentPicture] = useState(photoURL)
  const [errorPicture, setErrorPicture] = useState<string | null>(null)

  const handlerProfilePictureChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const file = target.files?.[0]

    setErrorPicture(null)

    if (!file) return

    const { size, type } = file

    if (!(/\/(jpeg|jpg|gif|png)$/i.test(type))) {
      setErrorPicture('Image format not allowed. Only .jpeg, .jpg, .gif or .png are allowed')
      setSomethingChanged(false)
      return
    }

    if (size >= (2000 * 1000)) {
      setErrorPicture('The file is too large. The maximum size allowed is 2MB')
      setSomethingChanged(false)
      return
    }

    setProfilePicture(file)
    setSomethingChanged(true)
    setCurrentPicture(URL.createObjectURL(file))
    toast.success(`The photo named ${file.name} was selected.`, { ...toastOptions, position: 'bottom-center' })
  }

  const handlerSaveChanges = (): void => {
    if (!somethingChanged) return

    setSomethingChanged(false)

    if (!profilePicture) {
      void toast.promise(
        updateProfilePicture(id, null),
        {
          loading: 'Deleting your profile photo...',
          success: () => {
            handleUpdateLocalUserDatails({ photoURL: null })
            setProfilePicture(null)
            void deleteImage(photoURL ?? undefined)
            handleIsModalProfileOpen(false)
            return 'Congratulations! Your profile photo has been successfully deleted.'
          },
          error: () => 'Sorry, there was a problem deleting your profile photo.'
        },
        toastOptions
      )

      return
    }

    const compressOptions = {
      height: 96,
      width: 96,
      size: 1000,
      type: profilePicture.type as EImageType
    }

    void toast.promise(
      uploadImage(profilePicture, 'USER_PROFILE_PICTURE', photoURL, compressOptions),
      {
        loading: 'Uploading your new profile photo...',
        success: (photo) => {
          void updateProfilePicture(id, photo)
          handleUpdateLocalUserDatails({ photoURL: photo })
          setProfilePicture(null)
          handleIsModalProfileOpen(false)
          return 'Congratulations! Your profile photo has been successfully updated.'
        },
        error: () => 'Sorry, there was a problem changing your profile photo.'
      },
      toastOptions
    )
  }

  const handlerCancelChangePicture = (): void => {
    setProfilePicture(null)
    setSomethingChanged(false)
    setCurrentPicture(photoURL)
    setErrorPicture(null)
  }

  const handlerDeletePicture = (): void => {
    setProfilePicture(null)
    setCurrentPicture(null)
    setErrorPicture(null)

    if (photoURL === null) {
      setSomethingChanged(false)
      return
    }

    setSomethingChanged(true)
  }
  return {
    currentPicture,
    errorPicture,
    somethingChanged,
    profilePicture,
    handlerProfilePictureChange,
    handlerSaveChanges,
    handlerCancelChangePicture,
    handlerDeletePicture
  }
}

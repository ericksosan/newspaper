import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase.config'
import { v4 } from 'uuid'

/**
 * The function `uploadImageCover` uploads a file to a storage location and returns
 * the download URL of the uploaded file.
 * @param {File} file - The `file` parameter is of type `File`, which represents a
 * file selected by the user through an input element of type "file". It contains
 * information about the selected file, such as its name, size, and type.
 * @returns a Promise that resolves to a string.
 */
export const uploadImageCover = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `/images/${file.name}${v4() as string}`)

  await uploadBytes(storageRef, file)

  return await getDownloadURL(storageRef)
}

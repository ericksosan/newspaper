import { uploadBytes, getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase.config'
import { v4 } from 'uuid'
import { deleteImage } from './deleteImage'
import { compressAccurately, type ICompressConfig } from 'image-conversion'

const storageAddress = {
  NEWSPAPPER_THUMBNAILS: '/newspaper/thumbnails',
  USER_PROFILE_PICTURE: '/user-profile-picture'
}

type StorageAddress = keyof typeof storageAddress

export const uploadImage = async (file: File, location: StorageAddress, oldURL: string | null, compressOptions?: ICompressConfig): Promise<string> => {
  const [, type] = file.name.split('.')

  const storageRef = ref(storage, `${storageAddress[location]}/${v4()}.${type}`)
  if (oldURL) {
    await deleteImage(oldURL)
  }

  const compressFile = await compressAccurately(file, compressOptions)

  await uploadBytes(storageRef, compressFile)

  return await getDownloadURL(storageRef)
}

import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../firebase.config'

export const deleteImage = async (prevUrl: string | undefined): Promise<void> => {
  const oldURLRef = ref(storage, prevUrl)
  await deleteObject(oldURLRef)
}

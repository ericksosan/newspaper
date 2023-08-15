import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, orderBy, where } from 'firebase/firestore'
import type { FormMarkdownEditor } from '../../types'
import { db } from '../firebase.config'
import { calculateReadingTime, createTextSummary } from '../utils'

export interface NewspaperDetails {
  idWritter: string
  nameWritter: string
  avatarWritter: string
  newspaper: FormMarkdownEditor
}

export interface NewspaperAllDetails {
  id: string
  cover: string
  title: string
  content: string
  summary: string
  idWritter: string
  nameWritter: string
  avatarWritter: string
  createdAt: string
  modifiedAt: string
  readingTimeText: string
}

// --------------- Pagination --------------- //

export interface DataNewspaper {
  allNewspaper: NewspaperAllDetails[]
  totalNewspaper: number
}

export const getAllNewspaper = async (currentPage: number = 1): Promise<DataNewspaper> => {
  const orderQueryBy = 'createdAt'
  const limitQuery = 20

  const currentPosition = (limitQuery * currentPage)
  const lastPosition = (limitQuery * (currentPage - 1))

  const queryRef = query(collection(db, 'newspaper'), orderBy(orderQueryBy, 'desc'))
  const docRef = await getDocs(queryRef)

  const totalNewspaper = Math.round(docRef.size / limitQuery)
  const allNewspaper = docRef.docs.slice(lastPosition, currentPosition).map((doc) => {
    return doc.data() as NewspaperAllDetails
  })

  return { allNewspaper, totalNewspaper }
}

// --------------- Get newspaper by one --------------- //

export const getNewspaperByOne = async (id: string): Promise<NewspaperAllDetails[] | null> => {
  const docRef = doc(db, 'newspaper', id)
  const newspaper = await getDoc(docRef)

  if (newspaper.exists()) {
    return newspaper.data() as NewspaperAllDetails[]
  }

  return null
}

// --------------- Get newspaper by Writter --------------- //

export const getNewspaperByWritter = async (id: string): Promise<NewspaperAllDetails[]> => {
  const collectionRef = collection(db, 'newspaper')
  const queryRef = query(collectionRef, where('idWritter', '==', id))
  return (await getDocs(queryRef)).docs.map((doc) => {
    return doc.data() as NewspaperAllDetails
  })
}

// --------------- Create newspaper --------------- //

export const createNewspaper = async (newspaperDetails: NewspaperDetails): Promise<void> => {
  const { idWritter, nameWritter, newspaper, avatarWritter } = newspaperDetails
  const date = new Date().toDateString().slice(4, 10)
  const readingTimeText = calculateReadingTime(newspaper.content)
  const summary = createTextSummary(newspaper.content)

  const collectionRef = collection(db, 'newspaper')

  const data = {
    id: '',
    summary,
    idWritter,
    avatarWritter,
    nameWritter,
    ...newspaper,
    readingTimeText,
    createdAt: date,
    modifiedAt: ''
  }

  const docRef = await addDoc(collectionRef, data)

  const { id } = docRef

  await updateDoc(docRef, { id })
}

// --------------- Update newspaper --------------- //

export const updateNewspaper = async (id: string, newspaperDetails: FormMarkdownEditor): Promise<void> => {
  const { content } = newspaperDetails
  const date = new Date().toDateString().slice(4, 10)

  const dataUpdate = {
    ...newspaperDetails,
    modifiedAt: date,
    summary: createTextSummary(content),
    readingTimeText: calculateReadingTime(content)
  }

  const docRef = doc(db, 'newspaper', id)
  await updateDoc(docRef, dataUpdate)
}

// --------------- Delete newspaper --------------- //

export const deleteNewspaper = async (id: string): Promise<void> => {
  const docRef = doc(db, 'newspaper', id)
  await deleteDoc(docRef)
}

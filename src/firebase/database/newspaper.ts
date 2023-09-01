import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, orderBy, where, limit } from 'firebase/firestore'
import { calculateReadingTime, createTextSummary } from '../utils'
import type { FormMarkdownEditor } from '../../types'
import { db } from '../firebase.config'

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
  createdAt: string
  modifiedAt: string
  nameWritter: string
  avatarWritter: string
  readingTimeText: string
}

// --------------- Pagination --------------- //

export interface DataNewspaper {
  totalNewspaper: number
  allNewspaper: NewspaperAllDetails[]
}

/**
 * The function `getAllNewspaper` retrieves a paginated list of newspaper documents
 * from a Firestore database.
 * @param {number} [currentPage=1] - The currentPage parameter is used to specify
 * the current page number for pagination. It is an optional parameter with a
 * default value of 1.
 * @returns an object of type `DataNewspaper`, which contains two properties:
 * `allNewspaper` and `totalNewspaper`. `allNewspaper` is an array of objects of
 * type `NewspaperAllDetails`, and `totalNewspaper` is a number.
 */
export const getAllNewspaper = async (currentPage: number = 1): Promise<DataNewspaper> => {
  const orderQueryBy = 'createdAt'
  const limitQuery = 20

  const currentPosition = (limitQuery * currentPage)
  const lastPosition = ((limitQuery) * ((currentPage - 1)))

  const preQuery = query(collection(db, 'newspaper'))
  const preDocRef = await getDocs(preQuery)
  const queryRef = query(collection(db, 'newspaper'), orderBy(orderQueryBy, 'desc'), limit(currentPosition))
  const docRef = (await getDocs(queryRef))

  const totalNewspaper = Math.round(preDocRef.size / limitQuery)
  const allNewspaper = docRef.docs.slice(lastPosition, currentPosition).map((doc) => {
    return doc.data() as NewspaperAllDetails
  })

  return { allNewspaper, totalNewspaper }
}

// --------------- Get newspaper by one --------------- //

/**
 * The function `getNewspaperByOne` retrieves a newspaper document from a database
 * based on its ID and returns its details if it exists, otherwise it returns null.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of a newspaper.
 * @returns The function `getNewspaperByOne` returns a Promise that resolves to
 * either a `NewspaperAllDetails` object or `null`.
 */
export const getNewspaperByOne = async (id: string): Promise<NewspaperAllDetails | null> => {
  const docRef = doc(db, 'newspaper', id)
  const newspaper = await getDoc(docRef)

  if (newspaper.exists()) {
    return newspaper.data() as NewspaperAllDetails
  }

  return null
}

// --------------- Get newspaper by Writter --------------- //

/**
 * The function `getNewspaperByWritter` retrieves all newspaper details written by
 * a specific writer.
 * @param {string} id - The `id` parameter is a string that represents the ID of
 * the writer.
 * @returns a Promise that resolves to an array of objects of type
 * NewspaperAllDetails.
 */
export const getNewspaperByWritter = async (id: string): Promise<NewspaperAllDetails[]> => {
  const collectionRef = collection(db, 'newspaper')
  const queryRef = query(collectionRef, where('idWritter', '==', id))
  return (await getDocs(queryRef)).docs.map((doc) => {
    return doc.data() as NewspaperAllDetails
  })
}

// --------------- Create newspaper --------------- //

/**
 * The `createNewspaper` function creates a new newspaper document in a database
 * collection and returns the ID of the created document.
 * @param {NewspaperDetails} newspaperDetails - The `newspaperDetails` parameter is
 * an object that contains the following properties:
 * @returns a Promise that resolves to a string.
 */
export const createNewspaper = async (newspaperDetails: NewspaperDetails): Promise<string> => {
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
  return id
}

// --------------- Update newspaper --------------- //

/**
 * The `updateNewspaper` function updates a newspaper document in a database with
 * new details, including the modified date, summary, and reading time.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of the newspaper document that needs to be updated in the database.
 * @param {FormMarkdownEditor} newspaperDetails - The `newspaperDetails` parameter
 * is an object that contains the details of the newspaper to be updated. It likely
 * includes properties such as `content`, which represents the content of the
 * newspaper, and other properties specific to the newspaper entity.
 */
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

/**
 * The `deleteNewspaper` function deletes a newspaper document from a database
 * using its ID.
 * @param {string} id - The `id` parameter is a string that represents the unique
 * identifier of the newspaper document that you want to delete.
 */
export const deleteNewspaper = async (id: string): Promise<void> => {
  const docRef = doc(db, 'newspaper', id)
  await deleteDoc(docRef)
}

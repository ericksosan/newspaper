import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc, where, limit, query, orderBy } from 'firebase/firestore'
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
  timestamp: number
}

const limitQuery = 20

// --------------- Pagination --------------- //

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
export const getAllNewspaper = async (currentPage: number = 1): Promise<NewspaperAllDetails[]> => {
  const currentPosition = (limitQuery * currentPage)
  const lastPosition = ((limitQuery) * ((currentPage - 1)))

  const queryRef = query(collection(db, 'newspaper'), orderBy('timestamp', 'desc'), limit(currentPosition))
  const docRef = (await getDocs(queryRef))

  return docRef.docs.slice(lastPosition, currentPosition).map((doc) => {
    return doc.data() as NewspaperAllDetails
  })
}

export const getTotalPages = async (): Promise<number> => {
  const queryRef = query(collection(db, 'newspaper'))
  const size = (await getDocs(queryRef)).size

  const total = Math.ceil(size / limitQuery)

  return total
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
  const queryRef = query(collection(db, 'newspaper'), where('idWritter', '==', id))
  return (await getDocs(queryRef)).docs.map((doc) => {
    return doc.data() as NewspaperAllDetails
  }).sort((a, b) => b.timestamp - a.timestamp)
}

// --------------- Get newspaper suggestions --------------- //

export const getSuggestions = async (quantitySuggestions: number = 8): Promise<NewspaperAllDetails[]> => {
  const suggestions: NewspaperAllDetails[] = []
  const prevSuggestions: number[] = []

  const queryRef = query(collection(db, 'newspaper'))

  const resul = (await getDocs(queryRef)).docs

  const generateSuggestions = (): number => Math.round(Math.random() * resul.length)

  let generatedSuggestions = generateSuggestions()

  do {
    if (!prevSuggestions.includes(generatedSuggestions)) {
      suggestions.push(resul[generatedSuggestions].data() as NewspaperAllDetails)

      prevSuggestions.push(generatedSuggestions)
    }

    generatedSuggestions = generateSuggestions()
  } while (suggestions.length !== quantitySuggestions)

  return suggestions
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
    modifiedAt: '',
    timestamp: Date.now()
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

// --------------- Update newspaper by writter --------------- //

/**
 * The function `updateNewspaperWritter` updates the name of a newspaper writer in
 * the Firestore database based on their ID.
 * @param {string} idWritter - The `idWritter` parameter is a string that
 * represents the ID of the writer whose newspaper records need to be updated.
 * @param {string} nameWritter - The `nameWritter` parameter is a string that
 * represents the new name of the newspaper writer.
 */
export const updateNewspaperWritter = async (idWritter: string, nameWritter: string): Promise<void> => {
  const queryRef = query(collection(db, 'newspaper'), where('idWritter', '==', idWritter))

  const docsByWritter = (await getDocs(queryRef))

  docsByWritter.docs.map(async (document) => {
    const docRef = doc(db, 'newspaper', document.id)
    await updateDoc(docRef, { nameWritter })
  })
}

// --------------- Update profile picture newspaper --------------- //

export const updateProfilePictureWritter = async (idWritter: string, avatarWritter: string | null): Promise<void> => {
  const queryRef = query(collection(db, 'newspaper'), where('idWritter', '==', idWritter))

  const docsByWritter = (await getDocs(queryRef))

  docsByWritter.docs.map(async (document) => {
    const docRef = doc(db, 'newspaper', document.id)
    await updateDoc(docRef, { avatarWritter })
  })
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

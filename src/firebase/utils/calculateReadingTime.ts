import { readingTime } from 'reading-time-estimator'

export const calculateReadingTime = (content: string): string => {
  const textDetails = readingTime(content)
  return textDetails.text
}

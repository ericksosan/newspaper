
export const commentElapsedTime = (publishedAtTimestamp: number): string => {
  const publishedAt = new Date(publishedAtTimestamp)

  const timeDifference = Date.now() - publishedAt.getTime()

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days >= 7) {
    return publishedAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } else if (days >= 1) {
    return `${days} day${days !== 1 ? 's' : ''} ago`
  } else if (hours >= 1) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else {
    return 'A few seconds ago'
  }
}

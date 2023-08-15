export const createTextSummary = (content: string): string => {
  const maxLength = 100
  const trimmedContent = content.length > maxLength ? content.substring(0, maxLength) + '...' : content
  return trimmedContent
}

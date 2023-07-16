import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { emojify } from 'node-emoji'
import 'highlight.js/styles/tokyo-night-dark.css'

type MarkdownParser = (markdown: string) => string

export const markdownParser: MarkdownParser = (markdown) => {
  marked.setOptions(
    {
      langPrefix: 'hljs language-',
      highlight (code, lang) {
        const language = (hljs.getLanguage(lang) != null) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      }
    }
  )

  const findEmoji = (match: string): string => {
    return emojify(match)
  }

  markdown = markdown.replace(/(:.*:)/g, findEmoji)
  const markdownParsed: string = marked.parse(DOMPurify.sanitize(markdown))

  return markdownParsed
}

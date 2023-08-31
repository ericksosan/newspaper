import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import { emojify } from 'node-emoji'
import 'highlight.js/styles/tokyo-night-dark.css'

type MarkdownParser = (markdown: string) => string

/**
 * The `markdownParser` function takes a markdown string as input, replaces any
 * emoji codes with their corresponding emoji characters, sanitizes the markdown
 * string, and then parses it into HTML using the `marked` library.
 * @param markdown - The `markdown` parameter is a string that represents the
 * markdown content that needs to be parsed.
 * @returns The function `markdownParser` returns the parsed markdown as a string.
 */
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

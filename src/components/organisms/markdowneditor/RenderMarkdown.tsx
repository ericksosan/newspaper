import { markdownParser } from '../../../utils'

interface RenderMarkdownProps {
  title: string
  cover: string
  content: string
}

export const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ title, cover, content }) => {
  const markdown = ` ![${title}](${cover}) \n # ${title} \n ${content}`
  const markdownParsed = markdownParser(markdown)

  return (
    <div
      className="max-w-full prose dark:prose-invert prose-code:px-2 prose-code:py-1
        prose-headings:font-montserrat prose-h1:text-xl prose-h2:text-lg sm:prose-h2:text-2xl
        sm:prose-h1:text-5xl prose-code:bg-slate-700 prose-code:rounded-md prose-img:rounded-md
        font-inter"
      dangerouslySetInnerHTML={{ __html: markdownParsed }}
    >
    </div>
  )
}

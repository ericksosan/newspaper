import { markdownParser } from '../../../utils'

interface RenderMarkdownProps {
  title: string
  cover: string
  content: string
}

export const RenderMarkdown: React.FC<RenderMarkdownProps> = ({ title, cover, content }) => {
  const markdown = `# ${title} \n ${content}`
  const markdownParsed = markdownParser(markdown)

  return (
    <div className="max-w-full mx-auto flex flex-col gap-6 pt-6 min-w-full" >
      <div className="rounded-xl overflow-hidden aspect-video min-w-full">
        <img
          src={cover}
          alt={title}
          className='w-full h-full object-cover aspect-auto' />
      </div>
      <div
        className="min-w-full prose dark:prose-invert prose-code:px-2 prose-code:py-1
        prose-headings:font-montserrat prose-h1:text-xl prose-h2:text-lg sm:prose-h2:text-2xl
        sm:prose-h1:text-5xl prose-code:bg-slate-700 prose-code:rounded-md prose-img:rounded-xl
        font-inter"
        dangerouslySetInnerHTML={{ __html: markdownParsed }}
      >
      </div>
    </div>
  )
}

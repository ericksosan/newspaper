import type { FormMarkdownEditor } from '../types'
import { markdownParser } from '../utils'

interface MarkdownPreviewProps {
  formMarkdownEditor: FormMarkdownEditor
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ formMarkdownEditor }) => {
  const { cover, title, content } = formMarkdownEditor

  const markdown = ` ![${title}](${cover}) \n # ${title} \n ${content}`
  const markdownParsed = markdownParser(markdown)

  return (
    <div className="w-full min-h-screen pt-4 pb-10 flex flex-col gap-4">
      <div className='mx-auto max-w-4xl'>
        <div
          className="max-w-full prose dark:prose-invert prose-code:px-2 prose-code:py-1
          prose-code:bg-slate-700 prose-code:rounded-md prose-img:rounded-md"
          dangerouslySetInnerHTML={{ __html: markdownParsed }}
        >
        </div>
      </div>
    </div>
  )
}

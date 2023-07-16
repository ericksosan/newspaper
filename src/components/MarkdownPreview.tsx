import { markdownParser } from '../utils'

interface MarkdownPreviewProps {
  markdown: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown }) => {
  const markdownParsed = markdownParser(markdown)

  return (
    <div className="w-full h-screen pt-4 flex flex-col gap-4">
      <hr className='rounded border-2 border-slate-200 dark:border-gray-700' />
      <div
        className="max-w-full px-20 markdown-editor prose dark:prose-invert
          prose-code:px-2 prose-code:py-1 prose-code:bg-slate-700
          prose-code:rounded-md prose-table:border prose-img:rounded-md
          prose-th:border prose-td:border prose-td:p-2 prose-th:p-2"
        dangerouslySetInnerHTML={{ __html: markdownParsed }}
      >
      </div>
    </div>
  )
}

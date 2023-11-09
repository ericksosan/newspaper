import type { FormMarkdownEditor } from '../../../types'
import { RenderMarkdown } from '../markdowneditor'

interface NewspaperPreviewProps {
  formMarkdownEditor: FormMarkdownEditor
}

export const NewspaperPreview: React.FC<NewspaperPreviewProps> = ({ formMarkdownEditor }) => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-4 animate-fade animate-duration-300 animate-ease-in">
      <RenderMarkdown {...formMarkdownEditor} />
    </div>
  )
}

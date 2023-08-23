import type { FormMarkdownEditor } from '../../../types'
import { RenderMarkdown } from '../markdown'

interface NewspaperPreviewProps {
  formMarkdownEditor: FormMarkdownEditor
}

export const NewspaperPreview: React.FC<NewspaperPreviewProps> = ({ formMarkdownEditor }) => {
  return (
    <div className="w-full min-h-screen pb-10 flex flex-col gap-4">
      <RenderMarkdown { ...formMarkdownEditor } />
    </div>
  )
}

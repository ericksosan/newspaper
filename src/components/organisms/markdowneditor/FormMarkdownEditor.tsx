import type { FormMarkdownEditor as FormMardownEditorValues } from '../../../types'

interface MarkdownEditorProps {
  handleInputChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  formMarkdownEditor: FormMardownEditorValues
}

export const FormMarkdownEditor: React.FC<MarkdownEditorProps> = ({ formMarkdownEditor, handleInputChange }) => {
  return (
    <form className='flex flex-col gap-3 items-start'>
      <input
        type="url"
        placeholder='Enter the URL of the cover page.'
        name="cover"
        value={formMarkdownEditor.cover}
        onChange={handleInputChange}
        autoComplete='off'
        autoFocus
        className='markdown-editor-field'
      />

      <input
        type="text"
        placeholder='Enter here the title of the news item...'
        name='title'
        value={formMarkdownEditor.title}
        onChange={handleInputChange}
        autoComplete='off'
        className='markdown-editor-field'
      />

      <textarea
        rows={25}
        name="content"
        value={formMarkdownEditor.content}
        onChange={handleInputChange}
        placeholder='Write the content of your news here.'
        className=" markdown-editor-field modify-scroll resize-none"
      >
      </textarea>
    </form>
  )
}

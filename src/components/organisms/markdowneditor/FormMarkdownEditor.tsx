import { type UseFormRegister } from 'react-hook-form'
import type { FormMarkdownEditor as FormMardownEditorValues } from '../../../types'

interface MarkdownEditorProps {
  register: UseFormRegister<FormMardownEditorValues>
}

export const FormMarkdownEditor: React.FC<MarkdownEditorProps> = ({ register }) => {
  return (
    <form className='flex flex-col gap-3 items-start'>
      <input
        type="url"
        placeholder='Enter the URL of the cover page.'
        autoComplete='off'
        autoFocus
        className='markdown-editor-field'
        { ...register('cover') }
      />

      <input
        type="text"
        placeholder='Enter here the title of the news item...'
        autoComplete='off'
        className='markdown-editor-field'
        { ...register('title', { minLength: { value: 1, message: 'min length' } }) }

      />

      <textarea
        rows={25}
        placeholder='Write the content of your news here.'
        className=" markdown-editor-field modify-scroll resize-none"
        { ...register('content') }
      >
      </textarea>
    </form>
  )
}

import { HelperUseEditorContent } from '.'
import type { FormMarkdownEditor } from '../types'

interface MarkdownEditorProps {
  handleInputChange: ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  formMarkdownEditor: FormMarkdownEditor
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ handleInputChange, formMarkdownEditor }) => {
  return (
    <div className="py-5">
      <form className='flex flex-col gap-3 items-start'>
        <input
          type="url"
          placeholder='Enter the URL of the cover page.'
          name="cover"
          value={formMarkdownEditor.cover}
          onChange={handleInputChange}
          autoComplete='off'
          autoFocus
          className='markdown-editor w-full bg-transparent py-3
          font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
          border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
          dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
        />
        <input
          type="text"
          placeholder='Enter here the title of the news item...'
          name='title'
          value={formMarkdownEditor.title}
          onChange={handleInputChange}
          autoComplete='off'
          className='markdown-editor w-full bg-transparent py-3
          font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
          border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
          dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
        />
        <HelperUseEditorContent />
        <textarea
          rows={25}
          name="content"
          value={formMarkdownEditor.content}
          spellCheck={false}
          onChange={handleInputChange}
          placeholder='Write the content of your news here.'
          className="markdown-editor resize-none block p-3 w-full text-sm md:text-xl text-gray-900 bg-gray-50
          rounded-md border border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-transparent"
        >
        </textarea>
      </form>
    </div>
  )
}

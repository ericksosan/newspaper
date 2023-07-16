import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

interface MarkdownEditorProps {
  handleMarkdown: ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => void
  markdown: string
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ handleMarkdown, markdown }) => {
  return (
    <div className="py-10 h-full">
      <form className='flex flex-col gap-2 h-full items-start'>
        <label htmlFor="file-upload"
          className="px-4 py-2 rounded-md cursor-pointer bg-slate-600
        text-white dark:bg-slate-500 font-inter font-semibold transition-opacity
          duration-300 ease-in hover:opacity-80"
        >
          Add a cover image
          <input type="file" id="file-upload" name="ufile-upload" className='hidden' />
        </label>
        <input
          type="text"
          placeholder='Enter here the title of the news item...'
          className="w-full text-xl md:h-20 lg:text-5xl bg-transparent
          font-bold border-none outline-none text-slate-900 dark:text-gray-200"
        />
        <hr className='rounded w-full border-2 border-slate-200 dark:border-gray-700' />
        <p className="text-sm w-full text-slate-700 dark:text-slate-400 flex
          justify-end items-center gap-1">
          <FontAwesomeIcon icon={faCircleExclamation} />
          You can use <kbd className="text-success bg-slate-200 dark:bg-slate-900 px-2 py-1 rounded">Markdown</kbd> in your content!
        </p>
        <textarea name="markdown"
          rows={25}
          value={markdown}
          spellCheck={false}
          onChange={handleMarkdown}
          placeholder='Write the content of your news here.'
          className='w-full markdown-editor'
        >
        </textarea>
      </form>
    </div>
  )
}

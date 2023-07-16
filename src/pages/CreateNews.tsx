import { useState } from 'react'
import { MarkdownEditor, MarkdownPreview } from '../components'
import { twJoin } from 'tailwind-merge'

export const CreateNews: React.FC = () => {
  const [controllers, setControllers] = useState<boolean>(false)
  const [section, setSection] = useState<string>('Create News')
  const [markdown, setMarkdown] = useState<string>('')

  const handleMarkdown = ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMarkdown(target.value)
  }

  const handleSwitchControllers = (): void => {
    setControllers(!controllers)
    setSection(
      controllers
        ? 'Edit'
        : 'Preview'
    )
  }

  return (
    <div className="px-5 md:px-10 pt-16 pb-2 font-inter h-auto">
      <div className='lg:max-w-7xl lg:mx-auto flex flex-col'>
        <div className="flex justify-between items-center">
          <h1 className={
            twJoin(
              controllers
                ? 'animate-fade-down'
                : 'animate-fade-up',
              `text-xl md:text-4xl text-slate-900 font-bold
              dark:text-gray-200 animate-duration-500 animate-ease-in-out`
            )
          }
          >
            {section}
          </h1>
          <div className="flex gap-3 [&>button]:transition-all [&>button]:duration-300
            [&>button]:ease-in [&>button]:py-1 [&>button]:px-2 [&>button]:md:py-2
            [&>button]:md:px-5 [&>button]:font-semibold [&>button]:rounded [&>button]:border"
          >

            {
              controllers
                ? <button
                  onClick={handleSwitchControllers}
                  className=' border-slate-900 hover:bg-slate-900 hover:text-white
                text-slate-900 dark:border-gray-200 dark:hover:bg-gray-200
                dark:text-white dark:hover:text-slate-900'
                >
                  Edit
                </button>
                : <button
                  onClick={handleSwitchControllers}
                  disabled={markdown.length === 0}
                  className='border-success hover:bg-success/80 hover:text-white
                  text-success disabled:dark:bg-slate-700 disabled:dark:border-slate-700
                  disabled:dark:text-white disabled:bg-slate-300 disabled:border-slate-300
                  disabled:text-slate-900 disabled:opacity-50'
                >
                  Preview
                </button>
            }

            <button className='border-primary bg-primary text-white hover:opacity-80'>
              Save
            </button>
          </div>
        </div>
        {
          controllers
            ? <MarkdownPreview markdown={markdown} />
            : <MarkdownEditor handleMarkdown={handleMarkdown} markdown={markdown} />
        }
      </div>
    </div>
  )
}

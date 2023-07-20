import { useState } from 'react'
import { MarkdownEditor, MarkdownPreview } from '../components'
import { twJoin } from 'tailwind-merge'
import type { FormMarkdownEditor } from '../types'

export const CreateNews: React.FC = () => {
  const [controllers, setControllers] = useState<boolean>(false)
  const [section, setSection] = useState<string>('Create News')
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>({
    cover: '',
    title: '',
    content: ''
  })

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { name, value } = target
    setFormMarkdownEditor({
      ...formMarkdownEditor,
      [name]: value
    })
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
    <div className="px-5 md:px-10 pt-8 lg:pt-16 pb-2 h-auto">
      <div className='lg:max-w-7xl lg:mx-auto flex flex-col'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <h1 className={
            twJoin(
              controllers ? 'animate-fade-down' : 'animate-fade-up',
              `text-xl md:text-4xl text-slate-900 font-bold dark:text-gray-200
                  first-letter:animate-duration-500 animate-ease-in-out`
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
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                >
                  Edit
                </button>
                : <button
                  onClick={handleSwitchControllers}
                  disabled={
                    formMarkdownEditor.content.length === 0 ||
                    formMarkdownEditor.title.length === 0 ||
                    formMarkdownEditor.cover.length === 0
                  }
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100
                  font-medium rounded-lg text-sm px-5 py-3 dark:bg-gray-800 dark:text-white
                  dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                  disabled:dark:bg-slate-700 disabled:dark:border-slate-700 disabled:dark:text-white
                  disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-900 disabled:opacity-50
                  "
                >
                  Preview
                </button>
            }

            <button className="text-gray-200 bg-azure-radiance-700 border-none hover:bg-azure-radiance-800 font-medium rounded-lg text-sm px-5 py-3">
              Post Newspaper
            </button>
          </div>
        </div>
        {
          controllers
            ? <MarkdownPreview formMarkdownEditor={formMarkdownEditor} />
            : <MarkdownEditor handleInputChange={handleInputChange} formMarkdownEditor={formMarkdownEditor} />
        }
      </div>
    </div>
  )
}

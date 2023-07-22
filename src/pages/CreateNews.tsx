import { useState } from 'react'
import { MarkdownEditor, MarkdownPreview } from '../components'
import { twJoin } from 'tailwind-merge'
import type { FormMarkdownEditor } from '../types'

export const CreateNews: React.FC = () => {
  const [controllers, setControllers] = useState<boolean>(false)
  const [section, setSection] = useState<string>('Create News')
  const [message, setMessage] = useState<string>('')
  const [formMarkdownEditor, setFormMarkdownEditor] = useState<FormMarkdownEditor>({
    cover: '',
    title: '',
    content: ''
  })

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
    const { name, value } = target
    setFormMarkdownEditor({
      ...formMarkdownEditor,
      [name]: value.trimStart()
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

  const handleSavePostNewspaper = (): void => {
    const { cover, title, content } = formMarkdownEditor

    if (cover.length === 0) setMessage('The URL of the cover page cannot be empty!')
    else if (title.length === 0) setMessage('The title cannot be empty!')
    else if (content.length === 0) setMessage('The content box is empty!')
    else setMessage('')
  }

  const isFormValid = formMarkdownEditor.content.length === 0 ||
    formMarkdownEditor.title.length === 0 ||
    formMarkdownEditor.cover.length === 0

  return (
    <div className="px-5 md:px-10 pt-8 lg:pt-16 pb-2 h-auto relative">
      <div className='lg:max-w-7xl lg:mx-auto flex flex-col'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <h1 className={
            twJoin(
              controllers ? 'animate-fade-down' : 'animate-fade-up',
              `text-sm md:text-4xl text-slate-900 font-bold dark:text-gray-200
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
                  className="button-create-news"
                >
                  Edit
                </button>
                : <button
                  onClick={handleSwitchControllers}
                  disabled={isFormValid}
                  className={twJoin(
                    'button-create-news',
                    isFormValid && 'disabled:dark:bg-slate-700 disabled:dark:border-slate-700 disabled:dark:text-white disabled:bg-slate-300 disabled:border-slate-300 disabled:text-slate-900 disabled:opacity-50'
                  )}
                >
                  Preview
                </button>
            }

            <button
              className="text-gray-200 bg-azure-radiance-700 border-none
              hover:bg-azure-radiance-800 font-medium rounded-lg text-sm px-5 py-3"
              onClick={handleSavePostNewspaper}>
              Post Newspaper
            </button>
          </div>
        </div>
        {
          message.length !== 0 &&
          <div
            className="pt-5 w-full flex justify-center items-center
            animate-fade-down">
            <span className='text-red-500 font-semibold text-sm lg:text-base select-none'>{message}</span>
          </div>
        }
        {
          controllers
            ? <MarkdownPreview formMarkdownEditor={formMarkdownEditor} />
            : <MarkdownEditor handleInputChange={handleInputChange} formMarkdownEditor={formMarkdownEditor} />
        }
      </div>
    </div>
  )
}

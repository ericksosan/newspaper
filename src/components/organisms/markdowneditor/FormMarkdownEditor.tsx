import { memo } from 'react'
import { type UseFormRegister } from 'react-hook-form'
import { Label } from '../../atoms'
import type { FormMarkdownEditor as FormMardownEditorValues } from '../../../types'
import { MarkdownIcon, PhotoCicleIcon } from '../../atoms/icon'
import { FormAlert } from '../../molecules'
import { twMerge } from 'tailwind-merge'

interface MarkdownEditorProps {
  cover?: string
  errorMessage: string
  isThumbnailOver: boolean
  fileThumbnail: File | null
  register: UseFormRegister<FormMardownEditorValues>
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  handleDropThumbnail: (e: React.DragEvent<HTMLDivElement>) => void
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormMarkdownEditor: React.FC<MarkdownEditorProps> = memo((props) => {
  const {
    cover,
    errorMessage,
    isThumbnailOver,
    fileThumbnail,
    register,
    handleDragOver,
    handleDragLeave,
    handleDropThumbnail,
    handleFileCoverChange
  } = props

  return (
    <>
      {
        errorMessage.length !== 0 &&
        <FormAlert alert={{ message: errorMessage, code: 'error' }} />
      }
      <form className='flex flex-col gap-3 items-start'>
        <Label className='mb-0' name='thumbnail' required>
          Thumbnail
        </Label>

        <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row items-center
        justify-between mb-3">
          <div className="flex flex-col w-full gap-2 md:w-1/2">

            <div
              onDragOver={handleDragOver}
              onDrop={handleDropThumbnail}
              onDragLeave={handleDragLeave}
              className={twMerge(
                `rounded-xl w-full h-60 bg-gray-100 overflow-hidden border-2
                border-dotted border-slate-300 hover:border-slate-900 transition-all
                duration-300 ease-in text-slate-500 hover:text-slate-900 dark:border-slate-600
                dark:hover:text-white dark:hover:border-slate-500 dark:bg-slate-800
                opacity-80 hover:opacity-100`,
                isThumbnailOver && `dark:text-white dark:border-slate-500 opacity-100
                border-slate-900 text-slate-900`
              )}>

              <label
                htmlFor="thumbnail"
                className="flex justify-center items-center gap-1 w-full h-full
                bg-transparent cursor-pointer font-medium flex-col" >

                <div className="flex justify-center flex-col items-center gap-1
                pointer-events-none select-none">
                  <PhotoCicleIcon className='w-10 h-10' />
                  {
                    isThumbnailOver
                      ? 'Drop it'
                      : (fileThumbnail ?? cover)
                        ? 'Change thumbnail'
                        : 'Drop your thumbnail or click to Browse'
                  }
                  <input
                    type="file"
                    id='thumbnail'
                    className='hidden'
                    accept='.jpg, .jpeg, .png'
                    onChange={handleFileCoverChange} />
                </div>

                <ul className='text-xs text-slate-500 flex items-center flex-col
                gap-0.5 mt-4 pointer-events-none select-none'>
                  <li>Thumbnail must be less than 2MB</li>
                  <li>Allowed image format: JPEG, JPG, PNG</li>
                </ul>
              </label>
            </div>

          </div>

          <div className={`w-full md:self-start md:w-80 flex flex-col gap-2 bg-gray-100
          dark:bg-slate-800 rounded-xl ${fileThumbnail ? 'border' : ''} dark:border-slate-700
          md:border-none`}>
            <div className="hidden md:block rounded-xl overflow-hidden aspect-video">
              <img src={(fileThumbnail ? URL.createObjectURL(fileThumbnail) : cover ?? '/images/thumbnail_placeholder.png')}
                className='object-cover w-full h-full aspect-auto' />
            </div>
            {
              fileThumbnail &&
              <h1 className='font-medium flex flex-col items-start dark:text-white animate-fade p-4 md:px-4 md:pb-4'>
                Filename
                <span className='text-slate-600 dark:text-slate-400 text-xs self-start text-left'>
                  {fileThumbnail.name}
                </span>
              </h1>
            }
          </div>
        </div>

        <Label className='mb-0' name='title' required>
          Title
        </Label>

        <input
          type="text"
          autoComplete='off'
          placeholder='Enter here the title of the news item...'
          className='markdown-editor-field'
          {...register('title')}
        />

        <div className="w-full items-center flex justify-between">
          <Label className='mb-0' name='content' required>
            Description
          </Label>
          <a
            className='flex items-center justify-center w-10 h-10 rounded-full md:w-auto md:rounded-md
          dark:hover:bg-white/5 [&>svg]:fill-azure-radiance-700 dark:[&>svg]:fill-white
          hover:bg-azure-radiance-700/10 transition-colors duration-300 ease-linear text-slate-900
          gap-1 md:px-4 text-sm dark:text-white self-end'
            rel='noreferrer'
            href="https://www.markdownguide.org/cheat-sheet/"
            target='_blank'>
            <MarkdownIcon className='w-5 h-5' />
            <span className='hidden md:block'>Markdown Guide.</span>
          </a>
        </div>

        <textarea
          rows={15}
          placeholder='Write the content of your news here and inspire the world with your words!'
          className=" markdown-editor-field modify-scroll resize-none"
          {...register('content')}>
        </textarea>
      </form>
    </>

  )
}
)

import { type UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { Label, Spinner } from '../../atoms'
import { useMarkdownEditorForm } from '../../../hooks'
import type { FormMarkdownEditor as FormMardownEditorValues, ImageFileStatus } from '../../../types'
import { MarkdownIcon } from '../../atoms/icon'

interface MarkdownEditorProps {
  imageFileStatus: ImageFileStatus
  register: UseFormRegister<FormMardownEditorValues>
  handleFileCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormMarkdownEditor: React.FC<MarkdownEditorProps> = ({ register, handleFileCoverChange, imageFileStatus }) => {
  const { changeModeCover, handleChangeModeCoverFileURL } = useMarkdownEditorForm()

  const activeMode = 'text-azure-radiance-700 font-bold dark:text-white'

  return (
    <form className='flex flex-col gap-3 items-start'>
      <div className="w-full flex items-center justify-end">
        <button
          type='button'
          onClick={handleChangeModeCoverFileURL}
          className='text-sm p-2 border bg-gray-50 text-slate-900 dark:text-gray-200
          border-gray-300 rounded-md font-inter dark:bg-gray-800 dark:border-gray-600
          hover:opacity-90 w-36'>
          <span className={!changeModeCover ? activeMode : ''}>
            URL
          </span>
          <span> or </span>
          <span className={changeModeCover ? activeMode : ''}>
            Image file
          </span>
        </button>
      </div>
      <div className={
        twMerge(
          'flex items-center gap-4',
          !changeModeCover ? 'hidden' : 'flex'
        )
      }>
        <label
          htmlFor="coverfile"
          className='block border bg-gray-50 text-slate-900 dark:text-gray-300
            border-gray-300 py-2 px-6 rounded-md font-inter font-medium dark:bg-gray-800
            dark:border-gray-600 cursor-pointer active:scale-105 transition-all
              duration-300 ease-in-out'
        >
          Add Cover
          <input
            type="file"
            id='coverfile'
            className='hidden'
            accept='.jpg, .jpeg, .png, .webp'
            onChange={handleFileCoverChange}
          />
        </label>
        <span className='text-slate-900 dark:text-gray-200 font-midium' >
          {
            imageFileStatus.isLoadingUpload
              ? <> {imageFileStatus.messageFile} <Spinner className='h-3 w-3' /> </>
              : imageFileStatus.messageFile
          }
        </span>
      </div>

      <Label
        className={
          twMerge(
            'mb-0',
            changeModeCover ? 'hidden' : 'block'
          )
        }
        name='cover'
        required>
        Cover
      </Label>
      <input
        autoFocus
        type="url"
        autoComplete='off'
        placeholder='Enter the URL of the cover page.'
        className={
          twMerge(
            'markdown-editor-field',
            changeModeCover ? 'hidden' : 'block'
          )
        }
        {...register('cover')}
      />

      <Label
        className='mb-0'
        name='title'
        required>
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
        <Label
          className='mb-0'
          name='content'
          required>
          Write the content of your news here.
        </Label>
        <a
          className='flex items-center justify-center w-10 h-10 rounded-full md:w-auto md:rounded-md dark:hover:bg-white/10
          [&>svg]:fill-azure-radiance-700 dark:[&>svg]:fill-white hover:bg-azure-radiance-700/10
          transition-colors duration-300 ease-linear text-slate-900 gap-1 md:px-4 text-sm dark:text-white
          self-end'
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
  )
}

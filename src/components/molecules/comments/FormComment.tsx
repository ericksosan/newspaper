import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '../../../firebase/hooks/useAuth'
import { Button, InputAlert } from '../../atoms'
import { SendCommentIcon } from '../../atoms/icon'
import { Avatar } from '..'

interface FormInputCommentBody {
  body: string
}

type FormMode = 'comment' | 'reply' | 'edit'

interface FormCommentsProps {
  commentAction: (body: string) => void
  formMode: FormMode
  replyTo?: string
  bodyEdit?: string
}

export const FormComment: React.FC<FormCommentsProps> = ({ commentAction, formMode, replyTo, bodyEdit }) => {
  const { user: { photoURL, fullname } } = useAuth()
  const { register, reset, handleSubmit, formState: { errors }, setValue, setFocus } = useForm<FormInputCommentBody>()

  const submitComment: SubmitHandler<FormInputCommentBody> = ({ body }) => {
    commentAction(body)
    reset()
  }

  useEffect(() => {
    if (formMode === 'edit') {
      setValue('body', bodyEdit ?? '')
      setFocus('body')
    }
  }, [])

  const formText = {
    edit: { label: 'Editing...', buttonText: 'Edit' },
    reply: { label: 'Reply to', buttonText: 'Reply' },
    comment: { label: 'Would you like to leave a comment?', buttonText: 'Comment' }
  }

  return (
    <div className='rounded-md border border-slate-300 dark:border-slate-700 p-4'>

      <div className='flex gap-1 md:gap-2 mb-4 items-center'>
        <Avatar
          img={photoURL}
          alt={fullname ?? ''}
          className="w-8 h-8 md:w-10 md:h-10" />
        <span className='text-xs md:text-sm font-semibold dark:text-white'>
          {fullname}
        </span>
      </div>

      <form className='flex flex-col gap-2 items-start' onSubmit={handleSubmit(submitComment)}>

        {errors.body?.message && <InputAlert className='self-end' message={errors.body.message} />}

        <label className='text-[10px] md:text-sm dark:text-white' htmlFor='body'>
          {
            formMode === 'reply'
              ? <span className='dark:text-gray-400'>
                {`${formText[formMode].label} `}
                <span className='text-azure-radiance-700 font-medium dark:text-white'>
                  {replyTo ?? ''}
                </span>
              </span>
              : formText[formMode].label
          }
        </label>
        <textarea
          rows={8}
          {...register('body', { required: { value: true, message: 'Required' } })}
          className='modify-scroll p-2 font-inter font-normal w-full outline-none
          rounded-md bg-transparent border border-slate-300 dark:border-slate-700
        dark:text-white text-xs md:text-sm focus:border-slate-400 dark:focus:border-slate-600'
          placeholder='What are your thoughts?'>
        </textarea>

        <Button
          className='self-end text-xs md:text-sm font-normal md:font-medium p-0 px-2 py-1
          md:px-4 md:py-1 md:pb-1.5 flex gap-1 items-center'
          colors='blue'>
          {
            formText[formMode].buttonText
          }
          <SendCommentIcon />
        </Button>

      </form>
    </div>
  )
}

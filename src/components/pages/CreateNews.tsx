import { memo } from 'react'
import { twJoin } from 'tailwind-merge'
import { FormMarkdownEditor, NewspaperPreview } from '../../components/organisms'
import { Button, Title } from '../../components/atoms'
import { ButtonLoading, FormAlert } from '../../components/molecules'
import { useCreateNews } from '../../hooks'

const CreateNews = (): JSX.Element => {
  const {
    section,
    message,
    register,
    isLoading,
    isSectionChanged,
    formMarkdownEditor,
    handlePostNewspaper,
    handleSwitchPreviewEdit
  } = useCreateNews()

  return (
    <div className="px-5 md:px-10 py-4 lg:py-10 h-auto relative font-montserrat">
      <div className='lg:max-w-4xl lg:mx-auto flex flex-col gap-3'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <Title className={
            twJoin(
              isSectionChanged ? 'animate-fade-down' : 'animate-fade-up',
              'text-lg md:text-4xl animate-duration-300 animate-ease-in-out'
            )
          }>
            {section}
          </Title>
          <div className="flex gap-3 [&>button]:py-1 [&>button]:px-2 [&>button]:md:py-2
            [&>button]:md:px-5"
          >

            {
              isSectionChanged
                ? <Button
                  colors='dark'
                  onClick={handleSwitchPreviewEdit} >
                  Edit
                </Button>
                : <Button
                  colors='dark'
                  onClick={handleSwitchPreviewEdit}
                >
                  Preview
                </Button>
            }

            <ButtonLoading
              isLoading={isLoading}
              color='blue'
              onClick={handlePostNewspaper}>
              Post Newspaper
            </ButtonLoading>
          </div>
        </div>
        {
          message.length !== 0 &&
          <FormAlert alert={{ message, code: 'error' }} />
        }
        {
          isSectionChanged
            ? <NewspaperPreview
              formMarkdownEditor={formMarkdownEditor} />
            : <FormMarkdownEditor register={register} />
        }
      </div>
    </div>
  )
}

export default memo(CreateNews)

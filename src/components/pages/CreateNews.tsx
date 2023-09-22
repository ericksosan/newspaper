import { FormMarkdownEditor, NewspaperPreview } from '../../components/organisms'
import { Button, Title } from '../../components/atoms'
import { FormAlert } from '../../components/molecules'
import { useCreateNews } from '../../hooks'

const CreateNews = (): JSX.Element => {
  const {
    section,
    message,
    register,
    isSectionChanged,
    formMarkdownEditor,
    handlePostNewspaper,
    handleSwitchPreviewEdit,
    handleFileCoverChange,
    imageFileStatus
  } = useCreateNews()

  return (
    <div className="px-5 sm:px-10 py-8 lg:py-10 min-h-screen relative font-montserrat">
      <div className='lg:max-w-4xl lg:mx-auto flex flex-col gap-3'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <Title className='text-lg md:text-4xl animate-duration-300 animate-ease-in-out'>
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

            <Button
              colors='blue'
              onClick={handlePostNewspaper}>
              Post Newspaper
            </Button>
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
            : <FormMarkdownEditor
              register={register}
              imageFileStatus={imageFileStatus}
              handleFileCoverChange={handleFileCoverChange} />
        }
      </div>
    </div>
  )
}

export default CreateNews

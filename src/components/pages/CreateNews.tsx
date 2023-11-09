import { FormMarkdownEditor, NewspaperPreview } from '../../components/organisms'
import { Button, Title } from '../../components/atoms'
import { useCreateNews } from '../../hooks'

const CreateNews = (): JSX.Element => {
  const {
    section,
    message,
    isSectionChanged,
    formMarkdownEditor,
    fileThumbnail,
    register,
    handlePostNewspaper,
    handleSwitchPreviewEdit,
    handleFileCoverChange,
    handleDropThumbnail,
    handleDragLeave,
    isThumbnailOver,
    handleDragOver
  } = useCreateNews()

  return (
    <div className="px-5 sm:px-10 py-8 lg:py-10 min-h-screen relative font-montserrat
    animate-fade animate-duration-300 animate-ease-in">
      <div className='lg:max-w-4xl lg:mx-auto flex flex-col gap-3'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <Title className={`text-lg md:text-4xl animate-duration-500 animate-ease-in-out
          ${isSectionChanged ? 'animate-fade' : ''}`}>
            {section}
          </Title>
          <div className="flex gap-3 [&>button]:py-1 [&>button]:px-2 [&>button]:md:py-2
            [&>button]:md:px-5">
            <Button
              colors='dark'
              onClick={handleSwitchPreviewEdit} >
              {
                isSectionChanged
                  ? 'Edit'
                  : 'Preview'
              }
            </Button>

            <Button
              colors='blue'
              onClick={handlePostNewspaper}>
              Post Newspaper
            </Button>
          </div>
        </div>
        {
          isSectionChanged
            ? <NewspaperPreview
              formMarkdownEditor={formMarkdownEditor} />
            : <FormMarkdownEditor
              register={register}
              errorMessage={message}
              fileThumbnail={fileThumbnail}
              handleDragOver={handleDragOver}
              isThumbnailOver={isThumbnailOver}
              handleDragLeave={handleDragLeave}
              handleDropThumbnail={handleDropThumbnail}
              handleFileCoverChange={handleFileCoverChange} />
        }
      </div>
    </div>
  )
}

export default CreateNews

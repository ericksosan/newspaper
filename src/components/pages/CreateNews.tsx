import { twJoin } from 'tailwind-merge'
import { FormMarkdownEditor, NewspaperPreview } from '../../components/organisms'
import { Button, Title } from '../../components/atoms'
import { ButtonLoading, FormAlert } from '../../components/molecules'
import { useMarkdownEditor } from '../../hooks'

export const CreateNews = (): JSX.Element => {
  const {
    controllers, message, section,
    formMarkdownEditor, handleInputChange,
    handleSavePostNewspaper, isFormValid,
    handleSwitchControllers, isLoading
  } = useMarkdownEditor()

  return (
    <div className="px-5 md:px-10 py-4 lg:py-10 h-auto relative font-montserrat">
      <div className='lg:max-w-4xl lg:mx-auto flex flex-col gap-3'>
        <div className="flex justify-between items-center border-b-2 pb-4 border-gray-300
        dark:border-gray-600">
          <Title className={
            twJoin(
              controllers ? 'animate-fade-down' : 'animate-fade-up',
              'text-lg md:text-4xl animate-duration-300 animate-ease-in-out'
            )
          }>
            {section}
          </Title>
          <div className="flex gap-3 [&>button]:py-1 [&>button]:px-2 [&>button]:md:py-2
            [&>button]:md:px-5"
          >

            {
              controllers
                ? <Button
                  colors='dark'
                  onClick={handleSwitchControllers} >
                  Edit
                </Button>
                : <Button
                  colors='dark'
                  onClick={handleSwitchControllers}
                  disabled={isFormValid} >
                  Preview
                </Button>
            }

            <ButtonLoading
              isLoading={isLoading}
              color='blue'
              onClick={() => { void handleSavePostNewspaper() }}>
              Post Newspaper
            </ButtonLoading>
          </div>
        </div>
        {
          message.length !== 0 &&
          <FormAlert code='error' message={message}/>
        }
        {
          controllers
            ? <NewspaperPreview
              formMarkdownEditor={formMarkdownEditor} />
            : <FormMarkdownEditor
              handleInputChange={handleInputChange}
              formMarkdownEditor={formMarkdownEditor} />
        }
      </div>
    </div>
  )
}

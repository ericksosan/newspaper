import { Container, LinkRedirect, Title } from '../../atoms'

export const ManagerNewspaperNotItems = (): JSX.Element => {
  return (
    <Container>
      <div className="flex items-center mt-10 justify-center flex-col lg:flex-row md:mt-0">
        <img
          src="/images/hiking.svg"
          alt=""
          className="w-1/2 dark:fill-white animate-fade-right animate-delay-150 animate-ease-in-out" />
        <div className="flex justify-center items-center flex-col gap-5 lg:gap-10 animate-fade-left animate-delay-300 animate-ease-in-out">
          <Title className="block text-xl md:text-4xl lg:text-6xl text-center">It seems you still have no news to manage.</Title>
          <LinkRedirect
            to='WRITE_NEWS'
            className='font-inter text-sm md:text-xl text-white rounded-md py-2 px-5 bg-azure-radiance-700 hover:bg-azure-radiance-800'
          >
            Go to create newspaper
          </LinkRedirect>
        </div>
      </div>
    </Container>
  )
}

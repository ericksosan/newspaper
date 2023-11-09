import { Container, Title } from '../../atoms'

export const NoNewspaperYet = (): JSX.Element => {
  return (
    <Container>
      <div className="flex gap-10 md:gap-0 mt-10 items-center md:justify-between flex-col lg:flex-row-reverse md:mt-0 min-h-screen">
        <img src="/images/sad_face.svg"
          alt="Newspaper Not Found"
          className="w-full md:w-3/4 lg:w-1/2 animate-fade-left animate-delay-150 animate-ease-in-out" />
        <div className="flex justify-center items-center md:w-full">
          <div className="flex flex-col animate-fade-right animate-delay-300 animate-ease-in-out">
            <Title className="text-2xl text-slate-900 font-inter ">
              Sorry,
            </Title>
            <h2 className="text-4xl font-bold text-slate-900 font-inter dark:text-white">We do not have</h2>
            <h3 className="text-6xl font-bold text-azure-radiance-700 ">
              Newspapers yet<span className='text-slate-900 dark:text-white'>.</span>
            </h3>
          </div>
        </div>
      </div>
    </Container>
  )
}

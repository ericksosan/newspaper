import { SubTitle, Title } from '../../atoms'

interface FormHeaderProps {
  title: string
  subTitle: string
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="mb-10 text-center flex flex-col">
      <Title className="text-2xl xl:text-3xl">{title}</Title>
      <SubTitle className='text-lg xl:text-xl text-gray-500 dark:text-gray-400'>{subTitle}</SubTitle>
    </div>
  )
}

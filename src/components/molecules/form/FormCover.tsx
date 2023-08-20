interface FormCoverProps {
  src: string
  alt: string
}
export const FormCover: React.FC<FormCoverProps> = ({ src, alt }) => {
  return (
    <div className="flex justify-center items-center lg:w-full">
      <img
        className='w-56 md:w-full'
        src={src}
        alt={alt}
      />
    </div>
  )
}

export const Avatar = (): JSX.Element => {
  return (
    <picture
      className='inline-block w-10 h-10 overflow-hidden rounded-full'
    >
      <img
        src="/images/mockprofile.webp"
        alt="profile"
        loading='lazy'
        className='object-cover w-full h-full'
      />
    </picture>
  )
}

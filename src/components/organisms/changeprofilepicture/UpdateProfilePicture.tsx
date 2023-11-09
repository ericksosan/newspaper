import { useAuth } from '../../../firebase/hooks/useAuth'
import { useChangeProfilePicture } from '../../../hooks'
import { Button, Title } from '../../atoms'
import { Avatar, FormAlert } from '../../molecules'
import { twMerge } from 'tailwind-merge'

export const UpdateProfilePicture = (): JSX.Element => {
  const {
    errorPicture,
    currentPicture,
    somethingChanged,
    profilePicture,
    handlerSaveChanges,
    handlerDeletePicture,
    handlerProfilePictureChange,
    handlerCancelChangePicture
  } = useChangeProfilePicture()

  const { user: { fullname, photoURL }, handleIsModalProfileOpen, isModalProfileOpen } = useAuth()

  const handlerCloseModal = (): void => {
    handleIsModalProfileOpen(false)
  }

  return (
    <>
      {errorPicture && <FormAlert alert={{ code: 'error', message: errorPicture }} />}
      {
        isModalProfileOpen &&
        <Title className='text-slate-900 dark:text-white font-inter font-semibold'>
          {fullname ?? ''}! Wants to set a profile picture; that would be <span className='text-green-500 font-bold'>pretty awesome!</span>😁
        </Title>
      }
      <div className={twMerge(
        'flex flex-col gap-12 py-4',
        (errorPicture && isModalProfileOpen) && 'gap-6 py-2'
      )}>

        <div className="header flex flex-col items-center gap-y-2 py-2">
          <Avatar
            className='w-20 h-20'
            img={currentPicture}
          />
          <Title className='font-inter text-xl'>{fullname}</Title>
        </div>

        <div className={`flex items-center ${(photoURL ?? profilePicture) ? 'justify-around' : 'justify-center'}`}>
          <label
            htmlFor="profilePicture"
            className='btn-file'>
            {currentPicture ? 'Change Picture' : 'Select Picture'}
            <input
              type="file"
              id='profilePicture'
              className='hidden'
              value={!profilePicture ? '' : ''}
              accept='.jpg, .GIF, .png'
              onChange={handlerProfilePictureChange}
            />
          </label>

          {
            (photoURL && currentPicture !== null) &&
            <Button colors='red' onClick={handlerDeletePicture}>
              Delete
            </Button>
          }
        </div>

        <span className="text-slate-400 text-center text-sm font-inter font-medium dark:text-slate-500">JPG, JPEG, GIF or PNG. Max size of 2MB</span>

        <div className={`flex items-center ${(somethingChanged || isModalProfileOpen) ? 'justify-between' : 'justify-end'}`}>
          {
            isModalProfileOpen &&
            <Button colors='red' onClick={handlerCloseModal}>
              Later
            </Button>
          }

          {
            (somethingChanged && !isModalProfileOpen) &&
            <Button colors='red' onClick={handlerCancelChangePicture}>
              Cancel
            </Button>
          }

          <Button colors='blue' disabled={!somethingChanged} onClick={handlerSaveChanges}>
            Save changes
          </Button>

        </div>

      </div>
    </>
  )
}

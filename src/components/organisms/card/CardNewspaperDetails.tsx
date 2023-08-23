
import { SubTitle, Title } from '../../atoms'
import { Avatar } from '../../molecules'
import { type NewspaperAllDetails } from '../../../firebase/database/newspaper'
import { ShareOnDropdown } from '..'

export const CardNewspaperDetails: React.FC<NewspaperAllDetails> = ({ title, avatarWritter, createdAt, nameWritter, modifiedAt, readingTimeText, id, summary }) => {
  return (
    <div className="w-full border dark:border-slate-700  dark:bg-slate-800 px-4 py-6 rounded-md font-inter">

      <div className="flex justify-between gap-3 flex-col sm:flex-row">
        <div className="flex gap-3 items-center">
          <Avatar
            img={avatarWritter}
            alt={nameWritter}
          />
          <div className="flex flex-col">
            <Title className='text-md font-montserrat'>{nameWritter}</Title>
            <SubTitle className='text-sm text-slate-700'> Posted on {modifiedAt === '' ? createdAt : modifiedAt} | {readingTimeText}</SubTitle>
          </div>
        </div>

        <ShareOnDropdown id={id} title={title} summary={summary}/>
      </div>
    </div >
  )
}

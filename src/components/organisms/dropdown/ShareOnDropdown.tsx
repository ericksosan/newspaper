import { useState } from 'react'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { twMerge } from 'tailwind-merge'
import { Button } from '../../atoms'

interface ShareOnDropdownProps {
  id: string
  title: string
  summary: string
}

export const ShareOnDropdown: React.FC<ShareOnDropdownProps> = ({ id, title, summary }) => {
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false)

  return (
    <div className="flex gap-2 items-center relative">
      <Button
        onClick={() => { setDropdownToggle(!dropdownToggle) }}
        className='block px-3 text-xs sm:text-base sm:px-6 sm:py-2 bg-azure-radiance-700 text-white
            font-medium rounded-md hover:bg-azure-radiance-800'>
        Share on
      </Button>

      <ul className={
        twMerge(
          `flex-col gap-2 rounded-md bg-white border dark:border-slate-700
          overflow-hidden top-12 dark:bg-slate-800 px-2.5 py-3 sm:w-full absolute
          left-0  dark:text-white text-slate-900 hover:[&>li]:text-azure-radiance-700
        dark:hover:[&>li]:text-white [&>li]:font-medium hover:[&>li]:hover:bg-slate-100
          [&>li]:w-full [&>li]:rounded-md dark:hover:[&>li]:bg-slate-700 [&>li]:p-2`,
          dropdownToggle ? 'flex' : 'hidden'
        )
      }>

        <li>
          <FacebookShareButton
            className='block w-full h-full'
            title={title}
            url={`http://localhost:5173/new/${id}`}>
            Facebook
          </FacebookShareButton>
        </li>

        <li>
          <WhatsappShareButton
            url={`http://localhost:5173/new/${id}`}
            className=' block w-full h-full'
            title={title}>
            Whatsapp
          </WhatsappShareButton>
        </li>

        <li>
          <TwitterShareButton
            className='block w-full h-full'
            title={title}
            url={`http://localhost:5173/new/${id}`}>
            X
          </TwitterShareButton>
        </li>

        <li>
          <LinkedinShareButton
            className=' block w-full h-full'
            title={title}
            summary={summary}
            source='http://localhost:5173/'
            url={`http://localhost:5173/new/${id}`}>
            LinkedIn
          </LinkedinShareButton>
        </li>
      </ul>
    </div>
  )
}

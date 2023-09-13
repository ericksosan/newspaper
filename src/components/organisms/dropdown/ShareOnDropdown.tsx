import { useState } from 'react'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from 'react-share'
import { Button } from '../../atoms'
import { FacebookIcon, LinkedInIcon, WhatsappIcon, XTwitterIcon } from '../../atoms/icon'
import { useClickAway } from '@uidotdev/usehooks'

interface ShareOnDropdownProps {
  id: string
  title: string
  summary: string
}

export const ShareOnDropdown: React.FC<ShareOnDropdownProps> = ({ id, title, summary }) => {
  const [dropdownToggle, setDropdownToggle] = useState<boolean>(false)
  const ref = useClickAway<HTMLUListElement>(() => { setDropdownToggle(!dropdownToggle) })

  const shareURL = `https://ericksosa-newspaper-mini-project.netlify.app/new/${id}`

  return (
    <div className="flex gap-2 items-center relative w-auto">
      <Button
        className='py-1.5 sm:py-2.5'
        colors='blue'
        onClick={() => { setDropdownToggle(true) }}>
        Share on
      </Button>

      {
        dropdownToggle &&
        <ul
          ref={ref}
          className='flex-col gap-2 rounded-md bg-white border dark:border-slate-700
          overflow-hidden top-12 dark:bg-slate-800 px-2.5 py-3 absolute sm:right-0
          dark:text-white text-slate-900 hover:[&>li]:text-azure-radiance-700
          hover:[&>li]:fill-azure-radiance-700 dark:hover:[&>li]:text-white
          dark:[&>li]:fill-white font-medium hover:[&>li]:bg-slate-100 [&>li]:w-full
          [&>li]:rounded-md dark:hover:[&>li]:bg-slate-700 [&>li]:p-2 [&>li]:text-lg'>
          <li>
            <TwitterShareButton
              className='flex gap-x-2 items-center w-full h-full'
              title={title}
              url={shareURL}>
              <XTwitterIcon />
              X
            </TwitterShareButton>
          </li>

          <li>
            <FacebookShareButton
              className='flex gap-x-2 items-center w-full h-full'
              title={title}
              url={shareURL}>
              <FacebookIcon />
              Facebook
            </FacebookShareButton>
          </li>

          <li>
            <WhatsappShareButton
              url={shareURL}
              className=' flex gap-x-2 items-center w-full h-full'
              title={title}>
              <WhatsappIcon />
              Whatsapp
            </WhatsappShareButton>
          </li>

          <li> 
            <LinkedinShareButton
              className=' flex gap-x-2 items-center w-full h-full'
              title={title}
              summary={summary}
              source='https://ericksosa-newspaper-mini-project.netlify.app'
              url={shareURL}>
              <LinkedInIcon />
              LinkedIn
            </LinkedinShareButton>
          </li>
        </ul>
      }
    </div>
  )
}

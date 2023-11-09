import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Button, Divider } from '../../atoms'
import { FacebookIcon, LinkedInIcon, LinkIcon, WhatsappIcon, XTwitterIcon } from '../../atoms/icon'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import toast from 'react-hot-toast'
import { toastOptions } from '../../../utils'
import { Modal } from '.'

interface ModalShareOnProps {
  id: string
  title: string
  summary: string
  handlerOpenModalShare: (value: boolean) => void
}

export const ModalShareOn: React.FC<ModalShareOnProps> = ({ id, title, summary, handlerOpenModalShare }) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard()

  const shareURL = `https://ericksosa-newspaper-mini-project.netlify.app/new/${id}`

  const handlerCopyToClipboard = (): void => {
    try {
      void copyToClipboard(shareURL)

      if (copiedText) {
        toast.success('Copied', toastOptions)
      }
    } catch (error) {
      toast.error('Error to copy.', toastOptions)
    }
  }

  const style = {
    icon: 'md:w-5 md:h-5 fill-azure-radiance-700 dark:fill-white',
    paragraph: 'text-sm text-gray-500 px-8 dark:text-gray-400'
  }

  return (
    <Modal handlerCloseModal={() => { handlerOpenModalShare(false) }} >
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900  dark:text-white font-inter">
        Let the world be informed!
      </h2>

      <p className={style.paragraph}>
        Share link via
      </p>

      <div className="flex gap-4 items-center justify-center py-4">
        <TwitterShareButton
          className='social-media-share'
          title={title}
          url={shareURL}>
          <XTwitterIcon className={style.icon} />
        </TwitterShareButton>

        <FacebookShareButton
          className='social-media-share'
          url={shareURL}>
          <FacebookIcon className={style.icon} />
        </FacebookShareButton>

        <WhatsappShareButton
          url={shareURL}
          className='social-media-share'
          title={title}>
          <WhatsappIcon className={style.icon} />
        </WhatsappShareButton>

        <LinkedinShareButton
          className='social-media-share'
          title={title}
          summary={summary}
          source='https://ericksosa-newspaper-mini-project.netlify.app'
          url={shareURL}>
          <LinkedInIcon className={style.icon} />
        </LinkedinShareButton>
      </div>

      <div className="flex w-full items-center gap-x-2.5">
        <Divider className='w-full' />
        <p className={style.paragraph}>
          Or
        </p>
        <Divider className='w-full' />
      </div>

      <div onClick={handlerCopyToClipboard}
        className="rounded-md border flex justify-between items-center mt-4 py-1
        md:py-2 dark:border-slate-700 dark:bg-slate-800 gap-x-1.5">

        <LinkIcon className='text-gray-500 ml-2 w-6 h-6' />

        <input
          readOnly
          type="url"
          placeholder="link"
          defaultValue={shareURL}
          className="w-3/4 outline-none bg-transparent dark:text-white" />
        <Button
          colors="blue"
          className="text-white rounded text-sm py-1 md:py-2 px-5 mr-2 font-normal font-inter">
          Copy
        </Button>
      </div>
    </Modal>
  )
}

import { useClickAway } from '@uidotdev/usehooks'
import { XCloseIcon } from '../../atoms/icon'
import { twMerge } from 'tailwind-merge'
import ReactDOM from 'react-dom'

interface ModalProps {
  className?: string
  children: React.ReactNode
  modalTitle?: string
  modalBody?: string
  handlerCloseModal: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, className, modalTitle, modalBody, handlerCloseModal }) => {
  const modalRef = useClickAway<HTMLDivElement>(handlerCloseModal)

  return ReactDOM.createPortal(
    <div tabIndex={-1} className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-black/80
    items-center p-8 overflow-x-hidden overflow-y-auto md:inset-0 min-h-screen max-h-full">

      <div
        ref={modalRef}
        className={
          twMerge(
            `w-full max-w-xl p-5 animate-jump-in animate-duration-300 animate-ease-linear
            relative mx-auto my-auto rounded-xl shadow-lg bg-white dark:bg-slate-900
            border dark:border-slate-700`,
            className
          )
        }>

        <div className={`w-full flex flex-auto ${modalTitle ? 'justify-between' : 'justify-end'}`}>
          <h1 className='font-semibold text-lg text-slate-900 dark:text-white'>{modalTitle}</h1>
          <button
            onClick={handlerCloseModal}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full text-slate-900
            hover:bg-black/5 dark:hover:bg-white/10 dark:text-white grid
            place-content-center">
            <XCloseIcon className="md:w-5 md:h-5" />
          </button>
        </div>

        <div className={
          twMerge(
            'text-center p-5 flex-auto justify-center gap-2',
            modalBody
          )
        }>
          {children}
        </div>
      </div>

    </div>, document.body
  )
}

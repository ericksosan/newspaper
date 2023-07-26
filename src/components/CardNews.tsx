import { useState } from 'react'
import { ArrowTopRightSquare, Tooth, UserCircle } from './Icons'
import { ModalManageNews } from '../components'

export const CardNews = (): JSX.Element => {
  const [openModal, setOpenModal] = useState<string | undefined>()

  const handleSetOpenModal = (action: string | undefined): void => {
    setOpenModal(action)
  }

  return (
    <figure className="shadow-sm h-auto w-auto flex rounded-md overflow-hidden relative border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200">
      <div className="overflow-hidden w-1/4 h-auto">
        <img src="https://images.pexels.com/photos/1647962/pexels-photo-1647962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="p-2 w-3/4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="bg-azure-radiance-100 text-azure-radiance-700 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-azure-radiance-700 dark:text-gray-200">#252525</span>
          <span className="text-sm block font-semibold">7/23/2023</span>
        </div>
        <h1 className="text-sm font-medium">How much Norwegian police can fine you for committing common outdoor offences</h1>
        <span className="font-regular flex font-medium text-sm gap-1"><UserCircle className="w-4" /> Lucas Paguro</span>
        <div className="flex items-center gap-2 [&>button]:transition-colors [&>button]:duration-500 [&>button]:ease-in-out">
          <button
            type="button"
            className='hover:hover:opacity-80'
          >
            <ArrowTopRightSquare className="w-5 h-5" />
          </button>
          <button
            type="button"
            className='hover:text-azure-radiance-700'
            onClick={() => { setOpenModal('default') }}>
            <Tooth className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ModalManageNews openModal={openModal} handleSetOpenModal={handleSetOpenModal} />
    </figure>
  )
}

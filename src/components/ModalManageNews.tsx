import { Modal } from 'flowbite-react'

interface ModalProps {
  openModal: string | undefined
  handleSetOpenModal: (action: string | undefined) => void
}

export const ModalManageNews: React.FC<ModalProps> = ({ openModal, handleSetOpenModal }) => {
  return (
    <>
      <Modal dismissible size={'6xl'} show={openModal === 'default'} onClose={() => { handleSetOpenModal(undefined) }}>
        <Modal.Header>Updating News</Modal.Header>
        <Modal.Body>
          <form className='flex flex-col gap-3 items-start'>
            <input
              type="url"
              placeholder='Enter the URL of the cover page.'
              name="cover"
              autoComplete='off'
              autoFocus
              className='markdown-editor w-full bg-transparent py-3
              font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
            border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
            dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
            />
            <input
              type="text"
              placeholder='Enter here the title of the news item...'
              name='title'
              // value={formMarkdownEditor.title}
              // onChange={handleInputChange}
              autoComplete='off'
              className='markdown-editor w-full bg-transparent py-3
           font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
           border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
           dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
            />
            {/* <HelperUseEditorContent /> */}
            <textarea
              rows={25}
              name="content"
              spellCheck={false}
              // value={formMarkdownEditor.content}
              // onChange={handleInputChange}
              placeholder='Write the content of your news here.'
              className="markdown-editor resize-none block p-3 w-full text-sm md:text-xl text-gray-900 bg-gray-50
           rounded-md border border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
           dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-transparent"
            >
            </textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button data-modal-hide="defaultModal" type="button" onClick={() => { handleSetOpenModal(undefined) }} className="text-white bg-azure-radiance-700 hover:bg-azure-radiance-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-azure-radiance-600 dark:hover:bg-azure-radiance-700">Save</button>
          <button data-modal-hide="defaultModal" type="button" onClick={() => { handleSetOpenModal(undefined) }} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
  // return (
  //   <div id="defaultModal" data-modal-toggle tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
  //     <div className="relative w-full max-w-2xl xl:max-w-4xl max-h-full">
  //       {/* Modal content */}
  //       <div className="relative bg-white border rounded-md dark:bg-slate-800 dark:border-slate-700">
  //         {/* Modal header */}
  //         <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
  //           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
  //             Updating News
  //           </h3>
  //           <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
  //             <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
  //               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
  //             </svg>
  //             <span className="sr-only">Close modal</span>
  //           </button>
  //         </div>
  //         {/* Modal body */}
  //         <div className="p-6 space-y-6">
  //         <form className='flex flex-col gap-3 items-start'>
  //       <input
  //         type="url"
  //         placeholder='Enter the URL of the cover page.'
  //         name="cover"
  //         // value={formMarkdownEditor.cover}
  //         // onChange={handleInputChange}
  //         autoComplete='off'
  //         autoFocus
  //         className='markdown-editor w-full bg-transparent py-3
  //         font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
  //         border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
  //         dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
  //       />
  //       <input
  //         type="text"
  //         placeholder='Enter here the title of the news item...'
  //         name='title'
  //         // value={formMarkdownEditor.title}
  //         // onChange={handleInputChange}
  //         autoComplete='off'
  //         className='markdown-editor w-full bg-transparent py-3
  //         font-bold text-slate-900 dark:text-gray-200 text-sm md:text-2xl bg-gray-50
  //         border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
  //         dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-transparent rounded-md'
  //       />
  //       {/* <HelperUseEditorContent /> */}
  //       <textarea
  //         rows={25}
  //         name="content"
  //         // value={formMarkdownEditor.content}
  //         spellCheck={false}
  //         // onChange={handleInputChange}
  //         placeholder='Write the content of your news here.'
  //         className="markdown-editor resize-none block p-3 w-full text-sm md:text-xl text-gray-900 bg-gray-50
  //         rounded-md border border-gray-300 focus:ring-transparent focus:border-gray-300 dark:bg-gray-800
  //         dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-transparent"
  //       >
  //       </textarea>
  //     </form>
  //         </div>
  //         {/* Modal footer */}
  //         <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
  //           <button data-modal-hide="defaultModal" type="button" className="text-white bg-azure-radiance-700 hover:bg-azure-radiance-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-azure-radiance-600 dark:hover:bg-azure-radiance-700">Save</button>
  //           <button data-modal-hide="defaultModal" type="button" className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">Delete</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

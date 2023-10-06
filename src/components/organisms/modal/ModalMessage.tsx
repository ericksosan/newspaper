import { Button } from '../../atoms'

export const ModalMessage = ({ onClick }: { onClick: () => void }): JSX.Element => {
  return (
    <div className="min-w-screen h-screen animated fadeIn faster px-5 fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" id="modal-id">
      <div className="absolute bg-black opacity-80 inset-0 z-0" />
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white dark:bg-slate-900">
        {/* content */}
        <div className="">
          {/* body */}
          <div className="text-center p-5 flex-auto justify-center">

            <img
              alt=""
              className=""
              src="/images/letter.svg" />

            <h2 className="text-xl font-bold py-4 dark:text-white">Check your email!</h2>
            <p className="text-sm text-gray-500 px-8 dark:text-gray-300">
              We have sent a password recovery email to your registered email address!
              Please check your inbox and, if you can&apos;t find the email, also check your spam folder.
            </p>
          </div>
          {/* footer */}
          <div className="p-3  mt-2 text-center space-x-4 md:block">

            <Button
              onClick={onClick}
              colors="blue"
            >
              Understood!
            </Button>
          </div>
        </div>
      </div>
    </div>

  )
}

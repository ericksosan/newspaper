import { SkeletonImage } from '../../atoms'

export const SkeletonCardManageNewspaper = (): JSX.Element => {
  return (
    <figure className="shadow-sm h-auto w-full flex animate-pulse flex-col rounded-md overflow-hidden border border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200">
      <div className="border-none overflow-hidden h-52 rounded-b-xl relative">

        <div className="flex items-start flex-col justify-between absolute h-full w-full dark:bg-gradient-to-b dark:from-slate-900">

          <div className="flex items-start justify-between w-full p-4">
            <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-40" />
            <div className="bg-gray-200 rounded-full dark:bg-gray-700 h-6 w-6" />
          </div>

          <div className="self-end p-2.5">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8" />
          </div>

        </div>
        <SkeletonImage className='flex w-full h-full' />

      </div>

      <div className="p-4 w-full flex flex-col gap-3">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-60" />
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-52" />

        <div className="flex items-center gap-1">
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-5 h-5" />
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10" />
        </div>

        <div className="flex items-center gap-2">
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-5 h-5" />
        </div>
      </div>
    </figure>
  )
}

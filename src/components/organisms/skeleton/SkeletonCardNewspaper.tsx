import { SkeletonAvatar, SkeletonImage } from '../../atoms'

export const SkeletonCardNewspaper = (): JSX.Element => {
  return (
    <div role="status" className="flex flex-col animate-pulse items-center bg-white border overflow-hidden border-gray-200 dark:hover:bg-slate-900
        transition-colors duration-300 ease-out rounded-lg dark:border-gray-700 dark:bg-slate-800
        w-full sm:w-full sm:py-6 shadow">

      <div className="flex flex-col justify-between p-6 gap-4 sm:py-0 w-full">
        <SkeletonImage className="sm:flex" />

        <div className="inline-flex items-center">
          <SkeletonAvatar />
          <div className="flex-grow flex flex-col pl-4">
            <div className="title-font font-semibold text-gray-800 dark:text-gray-200 flex justify-between">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
            </div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>

        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-11/12" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-60" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36" />
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12" />
      </div>
    </div>
  )
}

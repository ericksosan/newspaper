import { SkeletonAvatar, SkeletonElement, SkeletonImage } from '../../atoms'

export const SkeletonCardNewspaper = (): JSX.Element => {
  return (
    <div
      role="status"
      className="flex flex-col animate-pulse items-center bg-white border overflow-hidden
      border-gray-200 rounded-lg dark:border-gray-700 dark:bg-slate-800 w-full sm:w-full sm:py-6 shadow">

      <div className="flex flex-col justify-between p-4 gap-4 sm:py-0 w-full">
        <SkeletonImage className="sm:flex rounded-xl aspect-video h-auto" />

        <div className="inline-flex items-center">
          <SkeletonAvatar />
          <div className="flex-grow flex flex-col pl-4">
            <div className="flex justify-between">
              <SkeletonElement className="h-2 w-32 mb-2" />
            </div>
            <SkeletonElement className="w-48 h-2" />
          </div>
        </div>

        <SkeletonElement className="h-2.5 w-11/12" />
        <SkeletonElement className="h-2 w-60" />
        <SkeletonElement className="h-2 w-48" />
        <SkeletonElement className="h-2 w-36" />
        <SkeletonElement className="h-2 w-12" />
      </div>
    </div>
  )
}

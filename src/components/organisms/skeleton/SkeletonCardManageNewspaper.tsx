import { SkeletonElement, SkeletonImage } from '../../atoms'

export const SkeletonCardManageNewspaper = (): JSX.Element => {
  return (
    <figure className="shadow-sm h-auto w-full flex animate-pulse flex-col rounded-md
    overflow-hidden border border-slate-300 dark:bg-slate-800 dark:border-slate-700">

      <div className="border-none overflow-hidden h-52 rounded-b-xl relative">
        <div className="flex items-start flex-col justify-between absolute h-full
        w-full dark:bg-gradient-to-b dark:from-slate-900">
          <div className="flex items-start justify-between w-full p-4">
            <SkeletonElement className="h-5 w-40" />
            <SkeletonElement className="h-6 w-6" />
          </div>

          <div className="self-end p-2.5">
            <SkeletonElement className="h-2.5 w-8" />
          </div>
        </div>
        <SkeletonImage className='flex w-full h-full' />
      </div>

      <div className="p-4 w-full flex flex-col gap-3">
        <SkeletonElement className="h-2.5 w-60" />
        <SkeletonElement className="h-2.5 w-52" />

        <div className="flex items-center gap-1">
          <SkeletonElement className="w-5 h-5" />
          <SkeletonElement className="w-10 h-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonElement className="w-5 h-5" />
        </div>
      </div>
    </figure>
  )
}

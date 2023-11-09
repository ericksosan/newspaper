import { SkeletonAvatar, SkeletonElement } from '../../atoms'

export const SkeletonCardComment = (): JSX.Element => {
  return (
    <div className="pt-4 flex flex-col font-inter px-1.5 border-l-[1px]  md:px-4
    md:border-l-2 border-slate-300 dark:border-slate-700 relative overflow-hidden
    animate-pulse">

      <div className='flex gap-2 items-center relative'>
        <SkeletonElement className="border-slate-300 dark:border-slate-700 absolute w-full
        border-t-[1px] md:border-t-2 -translate-x-full" />

        <SkeletonAvatar className="w-8 h-8 md:w-10 md:h-10 border-[1px] md:border-2 border-slate-300 dark:border-slate-700 rounded-full" />
        <div className="flex flex-col font-semibold gap-1">
          <div className="flex gap-1 items-center">
            <SkeletonElement className="w-24 h-2" />
          </div>
          <time className="text-gray-600 dark:text-gray-400 font-normal text-[10px] font-inter">
            <SkeletonElement className="w-10 h-1.5 " />

          </time>
        </div>
      </div>

      <div className="py-4 font-inter flex flex-col gap-1">
        <SkeletonElement className="w-56 h-2.5 rounded-none" />
        <SkeletonElement className="w-40 h-2.5 rounded-none" />
        <SkeletonElement className="w-24 h-2.5 rounded-none" />

      </div>

      <div className="py-2 flex gap-3">
        <SkeletonElement className="w-20 h-5 !bg-azure-radiance-700" />
        <SkeletonElement className="w-20 h-5 " />
        <SkeletonElement className="w-20 h-5 " />
      </div >
    </div >
  )
}

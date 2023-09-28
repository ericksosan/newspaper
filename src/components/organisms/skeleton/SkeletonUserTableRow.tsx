import { SkeletonAvatar, SkeletonElement } from '../../atoms'

export const SkeletonUserTableRow = (): JSX.Element => {
  return (
    < tr role="status" className="bg-white dark:bg-slate-800 dark:border-gray-700
    [&>td]:px-6 [&>td]:py-4 animate-pulse [&>td>div]:flex [&>td>div]:gap-3">
      <td scope="row" className="px-6 py-4">
        <SkeletonAvatar />
      </td>
      <td scope="row" className="px-6 py-4">
        <div>
          <SkeletonElement className="h-3 rounded w-8" />
          <SkeletonElement className="h-3 rounded w-12" />
        </div>
      </td>
      <td scope="row" className="px-6 py-4">
        <div>
          <SkeletonElement className="h-3 rounded w-8" />
          <SkeletonElement className="h-3 rounded w-12" />
        </div>
      </td>
      <td>
        <div>
          <SkeletonElement className="h-3 rounded w-12" />
          <SkeletonElement className="h-3 rounded w-8" />
        </div>
      </td>
      <td>
        <div>
          <SkeletonElement className="h-3 rounded w-6" />
          <SkeletonElement className="h-3 rounded w-10" />
        </div>
      </td>
      <td>
        <SkeletonElement className="h-3 rounded w-24" />
      </td>
    </tr >
  )
}

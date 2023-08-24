import { SkeletonElement } from '../../atoms'

export const SkeletonUserTableRow = (): JSX.Element => {
  return (
    < tr role="status" className="bg-white dark:bg-slate-800 dark:border-gray-700
    [&>td]:px-6 [&>td]:py-4 animate-pulse [&>td>div]:flex [&>td>div]:gap-3">
      <td scope="row" className="px-6 py-4">
        <div>
          <SkeletonElement className="h-2.5 w-8" />
          <SkeletonElement className="h-2.5 w-12" />
        </div>
      </td>
      <td>
        <div>
          <SkeletonElement className="h-2.5 w-12" />
          <SkeletonElement className="h-2.5 w-8" />
        </div>
      </td>
      <td>
        <SkeletonElement className="h-2.5 w-24" />
      </td>
      <td>
        <div>
          <SkeletonElement className="h-2.5 w-6" />
          <SkeletonElement className="h-2.5 w-10" />
        </div>
      </td>
    </tr >
  )
}

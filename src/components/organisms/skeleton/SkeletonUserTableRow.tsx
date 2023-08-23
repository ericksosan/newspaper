export const SkeletonUserTableRow = (): JSX.Element => {
  return (
    < tr role="status" className="bg-white dark:bg-slate-800 dark:border-gray-700
    [&>td]:px-6 [&>td]:py-4 animate-pulse" >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex gap-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      </th>
      <td>
        <div className="flex gap-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-12"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      </td>
      <td>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
      </td>
      <td>
        <div className="flex gap-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
        </div>
      </td>
    </tr >
  )
}

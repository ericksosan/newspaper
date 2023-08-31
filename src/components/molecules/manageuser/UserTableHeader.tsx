
export const UserTableHeader = (): JSX.Element => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-slate-700
    dark:text-gray-400 [&>tr>th]:px-6 [&>tr>th]:py-3">
      <tr>
        <th scope="col"> Fullname </th>
        <th scope="col"> Username </th>
        <th scope="col"> Role </th>
        <th scope="col"> Change Role </th>
      </tr>
    </thead>
  )
}

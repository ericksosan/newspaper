
export const UserTableHeader = (): JSX.Element => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-slate-700
    dark:text-gray-400 [&>tr>th]:px-6 [&>tr>th]:py-3">
      <tr>
        <th scope="col"> Avatar </th>
        <th scope="col"> Full name </th>
        <th scope="col"> Username </th>
        <th scope="col"> Email </th>
        <th scope="col"> Roles </th>
        <th scope="col"> Change Role </th>
      </tr>
    </thead>
  )
}


export const UserTableHeader = (): JSX.Element => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-slate-700
     dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Fullname
        </th>
        <th scope="col" className="px-6 py-3">
          Username
        </th>
        <th scope="col" className="px-6 py-3">
          Role
        </th>
        <th scope="col" className="px-6 py-3">
          Change Role
        </th>
      </tr>
    </thead>
  )
}

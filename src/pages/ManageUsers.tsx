import { useState } from 'react'

export const ManageUsers = (): JSX.Element => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)

  const handleToggleChange = (): void => {
    setIsAdmin(!isAdmin)
  }

  return (
    <div className="lg:max-w-7xl lg:mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10">
      <h1 className="font-bold text-lg md:text-4xl dark:text-gray-200 pb-4">Users Management</h1>

      <div className="relative overflow-x-auto sm:rounded-lg border dark:border-slate-700">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
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
          <tbody>
            <tr className="bg-white dark:bg-slate-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                J. Cole
              </th>
              <td className="px-6 py-4">
                jcole
              </td>
              <td className="px-6 py-4">
                Admin
              </td>
              <td className="px-6 py-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" onChange={handleToggleChange} />
                  <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-azure-radiance-700" />
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

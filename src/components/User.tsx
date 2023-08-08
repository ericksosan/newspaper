import { useState, useEffect } from 'react'
import { updateRole, type UserDetails } from '../firebase/database/users'

interface UserProps {
  userDetails: UserDetails
}

export const User: React.FC<UserProps> = ({ userDetails: { fullname, username, isAdmin, id } }) => {
  const [check, setCheck] = useState<boolean>(isAdmin)

  useEffect(() => {
    void handleChangeRole()
  }, [check])

  const handleChangeRole = async (): Promise<void> => {
    try {
      await updateRole(id, check)
    } catch (error) { }
  }

  const handleToggleChange = (): void => {
    setCheck(!check)
  }

  return (
    < tr className="bg-white dark:bg-slate-800 dark:border-gray-700" >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {fullname}
      </th>
      <td className="px-6 py-4">
        {username}
      </td>
      <td className="px-6 py-4">
        {
          check
            ? 'admin'
            : 'user'
        }
      </td>
      <td className="px-6 py-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={check}
            onChange={handleToggleChange} />
          <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-azure-radiance-700" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</span>
        </label>
      </td>
    </tr >
  )
}

import { useState, useEffect } from 'react'
import { updateRole, type UserDetails } from '../../../firebase/database/users'
import { Avatar } from '..'

export const UserTableRow: React.FC<UserDetails> = ({ id, fullname, username, role, email, photoURL }) => {
  const isEditor = role === 'editor'

  const [check, setCheck] = useState<boolean>(isEditor)

  useEffect(() => {
    updateRole(id, check ? 'editor' : 'reader')
      .then(_res => { })
      .catch(_err => { })
  }, [check])

  const handleToggleChange = (): void => {
    setCheck(!check)
  }

  return (
    < tr className='bg-white dark:bg-slate-800 dark:border-gray-700 [&>td]:px-6 [&>td]:py-4'>
      <td>
        <Avatar
          img={photoURL}
          alt={fullname ?? ''}
        />
      </td>
      <td>{fullname}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{check ? 'editor' : 'reader'}</td>
      <td>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={check}
            onChange={handleToggleChange} />
          <div className="w-11 h-6 bg-gray-200 rounded-full dark:bg-gray-700
            peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-0.5 after:left-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all dark:border-gray-600
            peer-checked:bg-azure-radiance-700" />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Editor</span>
        </label>
      </td>
    </tr >
  )
}

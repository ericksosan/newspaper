import { useState, useEffect } from 'react'
import { type Users, getAllUsers, type UserDetails } from '../firebase/database/users'
import { Spinner, User } from '../components'
import { Loading } from '../components/Loading'
import { useAuth } from '../firebase/hooks/useAuth'

export const ManageUsers = (): JSX.Element => {
  const { user: { id } } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [listUsers, setListUsers] = useState<Users>([{} as UserDetails] as Users)

  useEffect(() => {
    void handleGetAllUsers()
  }, [])

  const handleGetAllUsers = async (): Promise<void> => {
    try {
      const users = await getAllUsers()
      setIsLoading(false)
      setListUsers(users.filter((user) => user.id !== id) as Users)
    } catch (error) { }
  }

  if (isLoading) return <Loading />

  return (
    <div className="lg:max-w-7xl lg:mx-auto flex flex-col pt-8 xl:pt-16 min-h-screen px-5 md:px-10 font-montserrat">
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
            {
              isLoading
                ? <Spinner />
                : listUsers.map((user) => (
                  <User key={user.id} userDetails={user} />
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

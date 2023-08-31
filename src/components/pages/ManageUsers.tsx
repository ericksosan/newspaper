import { Container, Title } from '../atoms'
import { UserTableBody, UserTableHeader } from '../molecules'

const ManageUsers = (): JSX.Element => {
  return (
    <Container>
      <Title className="font-bold text-xl md:text-4xl dark:text-gray-200 pb-4">
        Users Management
      </Title>
      <div className="relative overflow-x-auto rounded-lg border dark:border-slate-700 shadow">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 font-inter modify-scroll">
          <UserTableHeader />
          <UserTableBody />
        </table>
      </div>
    </Container>
  )
}

export default ManageUsers

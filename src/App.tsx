import { Routes, Route } from 'react-router-dom'
import { Login, Signup, CreateNews, ManageNews, ManageUsers, ChangePassword, ChangeUsername } from './pages'
import { Layout } from './components'

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h1 className="text-3xl font-bold">Home</h1>} />
          <Route path="/news" element={<h1 className="text-3xl font-bold">News</h1>} />

          {/* profile */}
          <Route path="/profile/change-username" element={<ChangeUsername />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />

          {/* Admin */}
          <Route path="/admin/news" element={<ManageNews />} />
          <Route path="/admin/news/add" element={<CreateNews />} />
          <Route path="/admin/users" element={<ManageUsers />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

import { Routes, Route } from 'react-router-dom'
import { Login } from './pages'
import { Layout } from './components'

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h1 className="text-3xl font-bold">Home</h1>} />
          <Route path="/news" element={<h1 className="text-3xl font-bold">News</h1>} />

          {/* profile */}
          <Route path="/profile/change-username" element={<h1 className="text-3xl font-bold text-green-500">Change Username</h1>} />
          <Route path="/profile/change-password" element={<h1 className="text-3xl font-bold text-green-500">Change Password</h1>} />

          {/* Admin */}
          <Route path="/admin/news" element={<h1 className="text-3xl font-bold text-red-500">Admin News</h1>} />
          <Route path="/admin/news/add" element={<h1 className="text-3xl font-bold text-red-500">Admin Add News</h1>} />
          <Route path="/admin/users" element={<h1 className="text-3xl font-bold text-red-500">Admin Users</h1>} />

        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<h1 className="text-3xl font-bold">Sign Up</h1>} />
      </Routes>
    </>
  )
}

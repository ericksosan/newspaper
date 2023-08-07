import { Routes, Route, Navigate } from 'react-router-dom'
import { Login, Signup, CreateNews, ManageNews, ManageUsers, ChangePassword, ChangeUsername, Home } from './pages'
import { AdminRoutes, AuthRoutes } from './components'
import { AuthProvider } from './firebase/contexts/AuthProvider'
import { ProtectedRoutes } from './components/ProtectedRoutes'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home/>} />

          {/* profile */}
          <Route path="/profile/change-username" element={<ChangeUsername />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="news" element={<ManageNews />} />
            <Route path="news/add" element={<CreateNews />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Route>

        <Route path='/auth' element={<AuthRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AuthProvider>
  )
}

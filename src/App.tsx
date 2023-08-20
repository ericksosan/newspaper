import { Routes, Route, Navigate } from 'react-router-dom'
import { CreateNews, ManageNews, ManageUsers, ChangePassword, ChangeUsername, NewspaperRender } from './pages'
import { AdminRoutes, AuthRoutes } from './components'
import { Login, Signup, Home } from './components/pages'
import { AuthProvider } from './firebase/contexts/AuthProvider'
import { Layout } from './components/organisms'

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />

          <Route path='/new/:id' element={<NewspaperRender />} />

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

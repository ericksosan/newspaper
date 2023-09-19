import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './firebase/contexts/AuthProvider'
import { ProtectedRoutes, AdminRoutes, AuthRoutes } from './routes'
import { Loading } from './components/molecules'
import { ManageNewspaperProvider } from './contexts'

const Home = lazy(async () => await import('./components/pages/Home'))
const NewspaperRender = lazy(async () => await import('./components/pages/NewspaperRender'))
const ChangeUsername = lazy(async () => await import('./components/pages/ChangeUsername'))
const ChangePassword = lazy(async () => await import('./components/pages/ChangePassword'))
const ManageNewspaper = lazy(async () => await import('./components/pages/ManageNewspaper'))
const CreateNews = lazy(async () => await import('./components/pages/CreateNews'))
const ManageUsers = lazy(async () => await import('./components/pages/ManageUsers'))
const Login = lazy(async () => await import('./components/pages/Login'))
const Signup = lazy(async () => await import('./components/pages/Signup'))
const ChangeFullName = lazy(async () => await import('./components/pages/ChangeFullName'))

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />

          <Route path='/new/:id' element={
            <Suspense fallback={<Loading />}>
              <NewspaperRender />
            </Suspense>
          } />

          {/* profile */}
          <Route path="/profile/change-username" element={
            <Suspense fallback={<Loading />}>
              <ChangeUsername />
            </Suspense>} />

          <Route path="/profile/change-password" element={
            <Suspense fallback={<Loading />}>
              <ChangePassword />
            </Suspense>} />

          <Route path="/profile/change-fullname" element={
            <Suspense fallback={<Loading />}>
              <ChangeFullName />
            </Suspense>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="news" element={
              <Suspense fallback={<Loading />}>
                <ManageNewspaperProvider>
                  <ManageNewspaper />
                </ManageNewspaperProvider>
              </Suspense>} />

            <Route path="news/add" element={
              <Suspense fallback={<Loading />}>
                <CreateNews />
              </Suspense>} />

            <Route path="users" element={
              <Suspense fallback={<Loading />}>
                <ManageUsers />
              </Suspense>} />
          </Route>
        </Route>

        <Route path='/auth' element={<AuthRoutes />}>
          <Route path="login" element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>} />

          <Route path="signup" element={
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>} />
        </Route>

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </AuthProvider>
  )
}

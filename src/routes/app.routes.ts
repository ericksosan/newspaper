export const AppRoutes = {
  HOME: '/',
  NEWS: '/new/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  ADMIN_NEWS: '/admin/news',
  ADMIN_USERS: '/admin/users',
  WRITE_NEWS: '/admin/news/add',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_USERNAME: '/profile/change-username',
  CHANGE_PASSWORD: '/profile/change-password',
  CHANGE_FULLNAME: '/profile/change-fullname'
} as const

export const AppRoutes = {
  HOME: '/',
  NEWS: '/new/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  ADMIN_NEWS: '/editor/manage/news',
  ADMIN_USERS: '/admin/manage/users',
  WRITE_NEWS: '/editor/write/news',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_USERNAME: '/profile/change-username',
  CHANGE_PASSWORD: '/profile/change-password',
  CHANGE_FULLNAME: '/profile/change-fullname',
  CHANGE_PROFILE_PICTURE: '/profile/change-profile-picture'
} as const

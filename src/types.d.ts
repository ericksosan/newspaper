export interface FormInputs {
  email: string
  password: string
}

export interface FormInputsSignup extends FormInputs {
  firstname: string
  lastname: string
  username: string
  rePassword: string
}

export interface FormMarkdownEditor {
  cover: string
  title: string
  content: string
}

export interface FormInputsChangePassword {
  oldPassword: string
  newPassword: string
  repassword: string
}

export interface FormInputChangeUsername {
  newUsername: string
}

type CodeAlert = 'error' | 'success' | 'none'
export interface Alert {
  code: CodeAlert
  message: string
}

export type ButtonColors = 'blue' | 'red' | 'white' | 'dark'

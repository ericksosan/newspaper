export interface FormInputs {
  email: string
  password: string
}

export interface FormInputsSignup extends FormInputs {
  firstname: string
  lastname: string
  username: string
  repassword: string
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

type CodeAlert = 'error' | 'success' | 'none'
export interface MessageAlert {
  codeAlert: CodeAlert
  message: string
}

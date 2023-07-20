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

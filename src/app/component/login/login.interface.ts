import { FormGroup } from "@angular/forms"

export interface ILoginComponent {
  form: FormGroup
  AppURL: any
  AuthURL: any
  returnURL: string
  ngOnInit(): void
  onSubmit(): void
}

export interface ILogin {
  email: string
  password: string
  remember: boolean
}
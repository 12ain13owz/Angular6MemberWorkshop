import { FormGroup } from "@angular/forms"

export interface ILoginComponent {
  form: FormGroup
  AppURL: any
  AuthURL: any
  ngOnInit(): void
  onSubmit(): void
}

export interface ILogin {
  email: string
  password: string
  remember: boolean
}
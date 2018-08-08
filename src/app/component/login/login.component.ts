import { Component, Renderer } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ILoginComponent } from './login.interface'
import { AlertService } from '../../shareds/services/alert.service'
import { ValidService } from '../../shareds/services/valid.service'
import { AppURL } from '../../app.url'
import { AuthURL } from '../../authentication/authentication.url'
import { AccountService } from '../../shareds/services/account.service'
import { AuthenService } from '../../services/authen.service'

declare const App: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements ILoginComponent {
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private valid: ValidService,
    private acccount: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData()
    if (this.authen.getAuthenticated)
      this.router.navigate(['/', this.AppURL.Authen, this.AuthURL.Dashboard])
  }

  form: FormGroup
  AppURL = AppURL
  AuthURL = AuthURL

  ngOnInit(): void {
    App.ForgotPassword()
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.valid.validateAllformFields(this.form)
      return this.alert.danger()
    } else {
      this.acccount
        .onLogin(this.form.value)
        .then(result => {
          this.authen.setAuthenticated(result.accessToken)
          this.alert.notify('Login Success.', 'success')
          this.router.navigate(['/', this.AppURL.Authen, this.AuthURL.Dashboard])
        })
        .catch(error => this.alert.notify(error.Message, 'danger'))
    }
  }

  private initialCreateFormData(): void {
    this.form = this.builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: [false]
    })
  }
}
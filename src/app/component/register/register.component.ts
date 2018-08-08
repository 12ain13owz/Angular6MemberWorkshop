import { Component, Renderer } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { IRegisterComponent } from './register.interface'
import { AppURL } from '../../app.url'
import { AlertService } from '../../shareds/services/alert.service'
import { AccountService } from '../../shareds/services/account.service'
import { ValidService } from '../../shareds/services/valid.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements IRegisterComponent {
  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private account: AccountService,
    private valid: ValidService,
    private router: Router
  ) {
    this.initialCreateFormData()
  }

  form: FormGroup
  AppURL = AppURL

  onSubmit(): void {
    if (!this.form.valid) {
      this.valid.validateAllformFields(this.form)
      return this.alert.danger()
    } else {
      this.account
        .onRegister(this.form.value)
        .then((result) => {
          this.alert.notify('You have been successfully registered.', 'success')
          this.router.navigate(['/', this.AppURL.Login])
        })
        .catch(error => this.alert.notify(error.Message, 'danger'))
    }
  }

  private initialCreateFormData(): void {
    this.form = this.builder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.valid.patternPassword]],
      cpassword: ['', [Validators.required, this.valid.comparePassword('password')]]
    })
  }
}

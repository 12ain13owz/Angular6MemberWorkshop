import { Component, Input } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BsModalRef } from 'ngx-bootstrap'
import { IChangePasswordComponent } from './change-password.interface'
import { AlertService } from '../../../../shareds/services/alert.service'
import { ValidService } from '../../../../shareds/services/valid.service'
import { AccountService } from '../../../../shareds/services/account.service'
import { AuthenService } from '../../../../services/authen.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements IChangePasswordComponent {

  @Input('modalRef') modalRef: BsModalRef
  form: FormGroup

  constructor(
    private builder: FormBuilder,
    private alert: AlertService,
    private valid: ValidService,
    private account: AccountService,
    private authen: AuthenService
  ) {
    this.initialCreateFormData()
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.valid.validateAllformFields(this.form)
      return this.alert.danger()
    }
    this.account
      .onChangePassword(this.authen.getAuthenticated, this.form.value)
      .then(result => {
        this.alert.notify('Change password success!', 'success')
        this.modalRef.hide()
      })
      .catch(error => this.alert.notify(error.Message, 'danger'))
  }

  private initialCreateFormData(): void {
    this.form = this.builder.group({
      old_pass: ['', [Validators.required]],
      new_pass: ['', [Validators.required, this.valid.patternPassword]],
      cnew_pass: ['', [Validators.required, this.valid.comparePassword('new_pass')]]
    })
  }
}

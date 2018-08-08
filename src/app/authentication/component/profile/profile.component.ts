import { Component, TemplateRef, Renderer } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BsModalRef, BsModalService } from 'ngx-bootstrap'

import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'
import { IProfileComponent } from './profile.interface'
import { AccountService } from '../../../shareds/services/account.service'
import { AuthenService } from '../../../services/authen.service'
import { AlertService } from '../../../shareds/services/alert.service'
import { ValidService } from '../../../shareds/services/valid.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements IProfileComponent {
  AppURL = AppURL
  AuthURL = AuthURL
  ImageType = 'image/jpeg, image/png'

  form: FormGroup
  modalRef: BsModalRef
  positionItem: any[] = [
    'Angular Developer',
    'NodeJS Developer'
  ]

  constructor(
    private builder: FormBuilder,
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private modalService: BsModalService,
    private valid: ValidService
  ) {
    this.initialCreateFormData()
    this.initialLoadUpdateFormData()
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      email: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      position: ['', [Validators.required]],
      image: [null]
    })

    this.form.get('email').disable()
  }

  private initialLoadUpdateFormData() {
    this.account.getUserLogin(this.authen.getAuthenticated)
      .then(result => {
        this.form.controls['email'].setValue(result.email)
        this.form.controls['firstname'].setValue(result.firstname)
        this.form.controls['lastname'].setValue(result.lastname)
        this.form.controls['position'].setValue(result.position)
        this.form.controls['image'].setValue(result.image)
      })
      .catch(error => this.alert.notify(error.Message, 'danger'))
  }

  openModal(templete: TemplateRef<any>) {
    this.modalRef = this.modalService.show(templete)
  }

  onSubmit() {
    if (this.form.invalid) {
      this.valid.validateAllformFields(this.form)
      return this.alert.notify('Data not success! Please check data. ', 'danger')
    }
    else {
      this.account.onUpdateProfile(this.authen.getAuthenticated, this.form.value)
        .then(() => this.alert.notify('Update Profile Success.', 'success'))
        .catch(error => this.alert.notify(error.Message, 'danger'))
    }
  }

  onConvertImage(inputFile: HTMLInputElement) {
    const imageControl = this.form.controls['image']
    const imageType = ['image/jpeg', 'image/png']
    imageControl.setValue(null)

    if (inputFile.files.length == 0) return
    else {
      if (imageType.indexOf(inputFile.files[0].type) < 0) {
        inputFile.value = null
        return this.alert.notify('Please uplaod image .jpeg or .png', 'danger')
      }

      const reader = new FileReader()
      reader.readAsDataURL(inputFile.files[0])
      reader.addEventListener('load', () => {
        imageControl.setValue(reader.result)
      })
    }
  }
}

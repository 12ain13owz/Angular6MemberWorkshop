import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'
import { IMemberCreateComponent } from './member-create.interface'
import { IRoleAccount } from 'src/app/shareds/services/account.service'
import { ShardsService } from 'src/app/shareds/services/shareds.service'
import { AlertService } from 'src/app/shareds/services/alert.service'
import { ValidService } from 'src/app/shareds/services/valid.service'
import { MemberService } from '../../services/member.service'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css'],
  providers: [MemberService]
})
export class MemberCreateComponent implements IMemberCreateComponent {
  constructor(
    private shards: ShardsService,
    private builder: FormBuilder,
    private alert: AlertService,
    private valid: ValidService,
    private member: MemberService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    this.activeRouter.params.forEach(params => {
      this.memId = params.id
    })

    this.positionItem = this.shards.positionItem
    this.initialCreateFormData()
    this.initialUpdateForm()
  }

  AppURL = AppURL
  AuthURL = AuthURL

  form: FormGroup
  memId: any
  positionItem: string[]
  roleItem: IRoleAccount[] = [
    IRoleAccount.Member,
    IRoleAccount.Employee,
    IRoleAccount.Admin
  ]
  ImageType = 'image/jpeg, image/png'

  // แสดงสิทธิผู์้ใช้งาน
  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role]
  }

  onSubmit() {
    if (this.form.invalid)
      return this.alert.danger()

    if (!this.memId) {
      this.member.createMember(this.form.value)
        .then(result => {
          this.alert.notify('Data Success', 'success')
          this.router.navigate(['/', AppURL.Authen, AuthURL.Members])
        })
        .catch(error => this.alert.notify(error.Message, 'danger'))
    } else {
      this.member.updateMember(this.memId, this.form.value)
        .then(res => {
          this.alert.notify('Success', 'success')
          this.router.navigate(['/', AppURL.Authen, AuthURL.Members])
        })
        .catch(error => this.alert.notify(error.Message, 'danger'))
    }


  }

  onConvertImage(inputFile: HTMLInputElement) {
    const imageControl = this.form.controls['image']

    this.shards.onConvertImage(inputFile)
      .then(result => imageControl.setValue(result))
      .catch(error => {
        inputFile.value = null
        imageControl.setValue(null)
        this.alert.notify(error.Message, 'danger')
      })
  }

  private initialCreateFormData() {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.valid.patternPassword]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['', Validators.required],
      role: ['', Validators.required],
      image: [null]
    })
  }

  private initialUpdateForm() {
    if (!this.memId) return

    this.member.getMemberById(this.memId)
      .then(result => {
        this.form.controls['email'].setValue(result.email)
        this.form.controls['firstname'].setValue(result.firstname)
        this.form.controls['lastname'].setValue(result.lastname)
        this.form.controls['position'].setValue(result.position)
        this.form.controls['role'].setValue(result.role)
        this.form.controls['image'].setValue(result.image)
        this.form.controls['password'].setValidators(this.valid.patternPassword)
        this.form.controls['password'].updateValueAndValidity()

      })
      .catch(error => {
        this.alert.notify(error.Message, 'danger')
        this.router.navigate(['/', AppURL.Authen, AuthURL.Members])
      })
  }
}

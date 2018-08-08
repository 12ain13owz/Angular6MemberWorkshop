import { FormGroup } from "../../../../../node_modules/@angular/forms"
import { TemplateRef } from "../../../../../node_modules/@angular/core"
import { BsModalRef } from "../../../../../node_modules/ngx-bootstrap"

export interface IProfileComponent {
  AppURL: {}
  AuthURL: {}
  ImageType: string
  positionItem: string[]
  form: FormGroup
  modalRef: BsModalRef
  onSubmit(): void
  onConvertImage(inputFile: HTMLInputElement): void
  openModal(template: TemplateRef<any>)
}

export interface IProfile {
  firstname: string
  lastname: string
  position: string
  image: string
}
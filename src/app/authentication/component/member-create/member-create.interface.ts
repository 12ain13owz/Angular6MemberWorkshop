import { FormGroup } from "@angular/forms"
import { IRoleAccount } from "src/app/shareds/services/account.service"

export interface IMemberCreateComponent {
  AppURL: {}
  AuthURL: {}

  form: FormGroup
  memId: any
  positionItem: string[]
  roleItem: IRoleAccount[]
  ImageType: string

  onSubmit(): void
  onConvertImage(inputFile: HTMLInputElement): void
  getRoleName(role: IRoleAccount): string
}
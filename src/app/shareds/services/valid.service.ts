import { Injectable, Renderer } from "@angular/core"
import { FormGroup, FormControl, AbstractControl } from "@angular/forms"

@Injectable()
export class ValidService {
  validateAllformFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control: any = formGroup.get(field)
      if (control instanceof FormControl)
        control.markAsDirty({ onlySelf: true })
      //else if (control instanceof FormGroup) this.validateAllformFields(control)
    })
  }

  /*
  focusInvalid(formGroup: FormGroup, render: Renderer) {
    for (let field in formGroup.controls) {
      const control: any = formGroup.get(field)
      if (control.invalid)
        return render.selectRootElement(`#${field}`).focus()
    }
  }
  */

  comparePassword(passwordField: string): object {
    return (cpassword: AbstractControl) => {
      if (!cpassword.parent) return
      const password = cpassword.parent.get(passwordField)
      const passwordSubscripe = password.valueChanges.subscribe(() => {
        cpassword.updateValueAndValidity()
        passwordSubscripe.unsubscribe()
      })

      if (cpassword.value === password.value) return
      return { compare: true }
    }
  }

  patternPassword(password: AbstractControl) {
    if (password.value == '') return
    if (/^[A-z0-9]{6,15}$/.test(password.value)) return
    return { password: true }
  }
}

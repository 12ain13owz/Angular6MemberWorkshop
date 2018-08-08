import { Directive, AfterViewInit, ElementRef, HostListener, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Directive({
  selector: '[appAutofocus]'
})

export class AutofocusDirective implements AfterViewInit {
  form: any = this.el.nativeElement.form

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    let inputField = this.form.querySelector('input')
    if (inputField) inputField.focus()
  }

  @HostListener('click') onSubmit() {
    let inputField = this.form.querySelector('.ng-invalid')
    if (inputField) inputField.focus()
  }
}

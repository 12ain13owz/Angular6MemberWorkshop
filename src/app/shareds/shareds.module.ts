import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { BsDropdownModule, ModalModule, PaginationModule, BsDatepickerModule } from 'ngx-bootstrap'
import { AuthNavbarComponent } from './component/auth-navbar/auth-navbar.component'
import { AuthSidebarComponent } from './component/auth-sidebar/auth-sidebar.component'
import { AuthContentComponent } from './component/auth-content/auth-content.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AlertService } from './services/alert.service'
import { AccountService } from './services/account.service'
import { AutofocusDirective } from './directive/autofocus.directive'
import { ValidService } from './services/valid.service'
import { ShardsService } from './services/shareds.service'

import { defineLocale } from 'ngx-bootstrap/chronos'
import { thLocale } from 'ngx-bootstrap/locale'
defineLocale('th', thLocale);

@NgModule({
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    AutofocusDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    BsDatepickerModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule,
    AutofocusDirective
  ],
  providers: [
    AlertService,
    //AccountService,
    ValidService,
    ShardsService
  ]
})

export class SharedsModule { }

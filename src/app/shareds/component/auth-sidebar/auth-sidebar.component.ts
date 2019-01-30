import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../../authentication/authentication.url'
import { IAuthSidebarComponent } from './auth.sidebar.interface'
import { IAccount, AccountService, IRoleAccount } from '../../services/account.service'
import { AuthenService } from '../../../services/authen.service'
import { AlertService } from '../../services/alert.service'
import { Router } from '../../../../../node_modules/@angular/router';

declare let App

@Component({
  selector: 'app-auth-sidebar',
  templateUrl: './auth-sidebar.component.html',
  styleUrls: ['./auth-sidebar.component.css']
})

export class AuthSidebarComponent implements OnInit, IAuthSidebarComponent {
  AppURL = AppURL
  AuthURL = AuthURL
  UserLogin: IAccount
  Role = IRoleAccount

  constructor(
    private account: AccountService,
    private authen: AuthenService,
    private alert: AlertService,
    private router: Router
  ) {
    this.initialLoaduserLogin()
  }

  ngOnInit() { }

  private initialLoaduserLogin() {
    this.UserLogin = this.account.UserLogin
    if (this.UserLogin.id)
      return setTimeout(() => {
        App.initilaLoadPage()
      }, 100);

    this.account
      .getUserLogin(this.authen.getAuthenticated)
      .then(result => {
        this.UserLogin = result

        setTimeout(() => {
          App.initilaLoadPage()
        }, 100);

      })
      .catch(error => {
        this.alert.notify(error.Message, 'danger')
        this.authen.clearAuthenticated()
        this.router.navigate(['/', AppURL.Login])
      })
  }
}

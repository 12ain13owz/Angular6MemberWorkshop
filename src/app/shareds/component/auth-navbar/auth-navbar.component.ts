import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../../authentication/authentication.url'
import { AuthenService } from '../../../services/authen.service'
import { Router } from '@angular/router'
import { AlertService } from '../../services/alert.service'

@Component({
  selector: 'app-auth-navbar',
  templateUrl: './auth-navbar.component.html',
  styleUrls: ['./auth-navbar.component.css']
})
export class AuthNavbarComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor(
    private router: Router,
    private auth: AuthenService,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  onLogout(): void {
    this.auth.clearAuthenticated()
    this.alert.notify('Log Out Success.', 'success')
    this.router.navigate(['/', AppURL.Login])
  }
}

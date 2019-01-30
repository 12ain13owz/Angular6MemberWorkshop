import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from '../services/authen.service';
import { AppURL } from '../app.url';
import { AlertService } from '../shareds/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authen: AuthenService,
    private router: Router,
    private alert: AlertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authen.getAuthenticated)
      return true

    this.alert.notify('AccessToken not found. Please Login.', 'danger')
    this.router.navigate(['/', AppURL.Login, { returnURL: state.url }])
    return false;
  }
}

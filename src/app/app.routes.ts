import { Routes, RouterModule, UrlHandlingStrategy } from '@angular/router'
import { AppURL } from './app.url'
import { LoginComponent } from './component/login/login.component'
import { RegisterComponent } from './component/register/register.component'
import { AuthenticationGuard } from './guards/authentication.guard';
import { UnauthenticationGuard } from './guards/unauthentication.guard';

const RouteLists: Routes = [
  {
    path: AppURL.Login,
    component: LoginComponent,
    canActivate: [UnauthenticationGuard]
  },
  {
    path: AppURL.Register,
    component: RegisterComponent,
    canActivate: [UnauthenticationGuard]
  },
  {
    path: AppURL.Authen,
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [AuthenticationGuard],
  },
  { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
  { path: '**', redirectTo: AppURL.Login, pathMatch: 'full' }
]

export const AppRoutes = RouterModule.forRoot(RouteLists, { onSameUrlNavigation: 'reload' })
import { Routes, RouterModule, UrlHandlingStrategy } from '@angular/router'
import { AppURL } from './app.url'
import { LoginComponent } from './component/login/login.component'
import { RegisterComponent } from './component/register/register.component'

const RouteLists: Routes = [
  { path: AppURL.Login, component: LoginComponent },
  { path: AppURL.Register, component: RegisterComponent },
  { path: AppURL.Authen, loadChildren: './authentication/authentication.module#AuthenticationModule' },
  { path: '', redirectTo: AppURL.Login, pathMatch: 'full' },
  { path: '**', redirectTo: AppURL.Login, pathMatch: 'full' }
]

export const AppRoutes = RouterModule.forRoot(RouteLists, { onSameUrlNavigation: 'reload' })
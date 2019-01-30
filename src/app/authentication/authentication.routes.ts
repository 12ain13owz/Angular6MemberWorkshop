import { Routes, RouterModule } from '@angular/router'
import { AuthURL } from './authentication.url'
import { DashboardComponent } from './component/dashboard/dashboard.component'
import { SettingsComponent } from './component/settings/settings.component'
import { ProfileComponent } from './component/profile/profile.component'
import { BootstrapComponent } from './component/bootstrap/bootstrap.component'
import { UicardsComponent } from './component/uicards/uicards.component'
import { WidgetsComponent } from './component/widgets/widgets.component'
import { ChartsComponent } from './component/charts/charts.component'
import { MembersComponent } from './component/members/members.component'
import { MemberCreateComponent } from './component/member-create/member-create.component'
import { UserRoleGuard } from '../guards/user-role.guard';
import { IRoleAccount } from '../shareds/services/account.service';

const RouteLists: Routes = [
  {
    path: AuthURL.Dashboard,
    component: DashboardComponent,
    canActivate: [UserRoleGuard],
    data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] },
  },
  { path: AuthURL.Settings, component: SettingsComponent },
  { path: AuthURL.Profile, component: ProfileComponent },
  { path: AuthURL.Bootstrap, component: BootstrapComponent },
  { path: AuthURL.UICards, component: UicardsComponent },
  { path: AuthURL.Widgets, component: WidgetsComponent },
  { path: AuthURL.Charts, component: ChartsComponent },
  {
    path: AuthURL.Members,
    component: MembersComponent,
    canActivate: [UserRoleGuard],
    data: { roles: [IRoleAccount.Admin, IRoleAccount.Employee] }
  },
  {
    path: AuthURL.MemberCreate,
    canActivate: [UserRoleGuard],
    data: { roles: [IRoleAccount.Admin] },
    children: [
      { path: '', component: MemberCreateComponent },
      { path: ':id', component: MemberCreateComponent }
    ]
  },
  { path: '', redirectTo: AuthURL.Profile, pathMatch: 'full' }
]

export const AuthenticationRoutes = RouterModule.forChild(RouteLists)
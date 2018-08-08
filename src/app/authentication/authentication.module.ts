import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './component/dashboard/dashboard.component'
import { AuthenticationRoutes } from './authentication.routes'
import { SharedsModule } from '../shareds/shareds.module'
import { SettingsComponent } from './component/settings/settings.component'
import { ProfileComponent } from './component/profile/profile.component'
import { BootstrapComponent } from './component/bootstrap/bootstrap.component'
import { WidgetsComponent } from './component/widgets/widgets.component'
import { UicardsComponent } from './component/uicards/uicards.component'
import { ChartsComponent } from './component/charts/charts.component';
import { MembersComponent } from './component/members/members.component';
import { MemberCreateComponent } from './component/member-create/member-create.component';
import { ChangePasswordComponent } from './component/profile/change-password/change-password.component'

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    ProfileComponent,
    BootstrapComponent,
    WidgetsComponent,
    UicardsComponent,
    ChartsComponent,
    MembersComponent,
    MemberCreateComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutes,
    SharedsModule,
  ]
})

export class AuthenticationModule { }

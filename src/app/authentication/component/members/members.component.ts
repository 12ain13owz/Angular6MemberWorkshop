import { Component, ChangeDetectorRef } from '@angular/core'
import { PageChangedEvent, BsLocaleService } from 'ngx-bootstrap'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'
import { MemberService } from '../../services/member.service'
import { IMembersComponent, IMemberSearchKey, IMemberSearch, IMember } from './members.interface'
import { IAccount, IRoleAccount, AccountService } from '../../../shareds/services/account.service'
import { AlertService } from '../../../shareds/services/alert.service'
import { Router } from '@angular/router'
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  AppURL = AppURL
  AuthURL = AuthURL

  items: IMember
  searchText: string = ''
  searchType: IMemberSearchKey
  searchTypeItems: IMemberSearchKey[] = [
    { key: 'email', value: 'E-mail' },
    { key: 'firstname', value: 'First Name' },
    { key: 'lastname', value: 'Last Name' },
    { key: 'position', value: 'Position' },
    { key: 'role', value: 'Role' },
    { key: 'update', value: 'Date' }
  ]

  startPage: number = 1
  limitPage: number = 5

  UserLogin: IAccount
  Role = IRoleAccount

  constructor(
    private member: MemberService,
    private alert: AlertService,
    private detact: ChangeDetectorRef,
    private router: Router,
    private localService: BsLocaleService,
    private authen: AuthenService,
    private account: AccountService
  ) {
    this.localService.use('th')

    this.initialLoadMembers({
      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.searchType = this.searchTypeItems[0]
    this.initialLoadUserLogin()
  }

  private initialLoadMembers(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(result => this.items = result)
      .catch(error => this.alert.notify(error.Message, 'danger'))
  }

  private get getSearchText() {
    let responseSearchText = null

    switch (this.searchType.key) {
      case 'role':
        for (const item in IRoleAccount) {
          if (item.toString().toLowerCase() == this.searchText.toLowerCase())
            responseSearchText = IRoleAccount[item]
        }
        break

      case 'update':
        try {
          const searchDate: { from: Date, to: Date } = { from: this.searchText[0], to: this.searchText[1] } as any
          if (searchDate.from == undefined || searchDate.to == undefined)
            return this.alert.danger()

          searchDate.from.setHours(0)
          searchDate.from.setMinutes(0)
          searchDate.from.setSeconds(0)

          searchDate.to.setHours(23)
          searchDate.to.setMinutes(23)
          searchDate.to.setSeconds(59)
          responseSearchText = searchDate
        }
        catch (error) {
          return this.alert.notify(`Error: ${error}`, 'danger')
        }
        break

      default:
        responseSearchText = this.searchText
        break
    }
    return responseSearchText
  }

  private initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin
    this.account.getUserLogin(this.authen.getAuthenticated)
      .then(result => this.UserLogin = result)
      .catch(error => this.alert.notify(error.Message, 'danger'))

  }

  onSearchItem(): void {
    this.startPage = 1
    this.initialLoadMembers({
      searchText: this.getSearchText,
      searchType: this.searchType.key,

      startPage: this.startPage,
      limitPage: this.limitPage
    })
    this.detact.detectChanges()
  }

  onPageChanged(page: PageChangedEvent) {
    this.initialLoadMembers({
      searchText: this.getSearchText,
      searchType: this.searchType.key,

      startPage: page.page,
      limitPage: page.itemsPerPage
    })
  }

  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role]
  }

  onDeleteMember(item: IAccount): void {
    this.alert.confirm()
      .then(status => {
        if (!status) return
        this.member.deleteMember(item.id)
          .then(() => {
            this.initialLoadMembers({
              searchText: this.getSearchText,
              searchType: this.searchType.key,

              startPage: this.startPage,
              limitPage: this.limitPage
            })

            this.alert.notify('Delete Success.', 'success')
          })
          .catch(error => this.alert.notify(error.Message, 'danger'))
      })



    // if (confirm(messageAlert)) {
    //   console.log(item)
    // }
  }

  onUpdateMember(item: IAccount): void {
    this.alert.notify(item.id, 'info')
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.MemberCreate,
      item.id
    ])
  }
}
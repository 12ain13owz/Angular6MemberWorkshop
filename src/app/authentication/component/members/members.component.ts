import { Component } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'
import { MemberService } from '../../services/member.service'
import { IMembersComponent, IMemberSearchKey, IMemberSearch } from './members.interface'
import { IAccount, IRoleAccount } from '../../../shareds/services/account.service'
import { AlertService } from '../../../shareds/services/alert.service'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  AppURL = AppURL
  AuthURL = AuthURL
  items: IAccount[]
  searchText: string = ''
  searchType: IMemberSearchKey
  searchTypeItems: IMemberSearchKey[] = [
    { key: 'email', value: 'E-mail' },
    { key: 'firstname', value: 'First Name' },
    { key: 'lastname', value: 'Last Name' },
    { key: 'position', value: 'Position' },
    { key: 'role', value: 'Role' },
  ]

  constructor(
    private member: MemberService,
    private alert: AlertService
  ) {
    this.initialLoadMembers()
    this.searchType = this.searchTypeItems[0]
  }

  private initialLoadMembers(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(result => this.items = result)
      .catch(error => this.alert.notify(error.Message, 'danger'))
  }

  onSearchItem(): void {
    let searchText: string = this.searchText

    if (this.searchType.key == 'role') {
      Object.keys(IRoleAccount).filter(result => {
        if (result.toString().toLowerCase() == this.searchText.toString().toLowerCase())
          return searchText = IRoleAccount[result]
      })
    }

    this.initialLoadMembers({
      searchText: searchText,
      searchType: this.searchType.key
    })

  }

  getRoleName(role: IRoleAccount): string {
    return IRoleAccount[role]
  }
}

import { IAccount, IRoleAccount } from "../../../shareds/services/account.service"

export interface IMembersComponent {
  AppURL: {}
  AuthURL: {}
  items: IAccount[]
  searchText: string
  searchType: IMemberSearchKey
  searchTypeItems: IMemberSearchKey[]

  onSearchItem(): void
  getRoleName(role: IRoleAccount): string
}

export interface IMemberSearch {
  searchText: string
  searchType: string
}

export interface IMemberSearchKey {
  key: string
  value: string
}
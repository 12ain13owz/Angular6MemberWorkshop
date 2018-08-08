import { Injectable } from "@angular/core"
import { AccountService, IAccount } from "../../shareds/services/account.service"
import { IMemberSearch } from "../component/members/members.interface"

@Injectable()
export class MemberService {
  constructor(
    private account: AccountService
  ) { }

  getMembers(options?: IMemberSearch) {
    return new Promise<IAccount[]>((resolve, reject) => {
      let items = this.account.mockUserItems

      if (options) {
        items = this.account
          .mockUserItems
          .filter(result =>
            result[options.searchType].toString()
              .toLowerCase()
              .indexOf(options.searchText.toString().toLowerCase()) >= 0
          )
      }
      resolve(items)
    })
  }
}
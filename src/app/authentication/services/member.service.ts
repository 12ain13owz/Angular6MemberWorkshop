import { Injectable } from "@angular/core"
import { AccountService, IAccount, IRoleAccount } from "../../shareds/services/account.service"
import { IMemberSearch, IMember } from "../component/members/members.interface"
import { HttpService } from "src/app/services/http.service"
import { AuthenService } from "src/app/services/authen.service";

declare let $

@Injectable()
export class MemberService {
  constructor(
    private account: AccountService,
    private http: HttpService,
    private authen: AuthenService
  ) {
    if (this.account.mockUserItems.length <= 2)
      this.generateMembers()
  }

  getMembers(options?: IMemberSearch) {
    return this.http
      .requestGet(`api/member?${$.param(options)}`, this.authen.getAuthenticated)
      .toPromise() as Promise<IMember>

    // return new Promise<IMember>((resolve, reject) => {
    //   const startItem = (options.startPage - 1) * options.limitPage
    //   const endItem = options.startPage * options.limitPage

    //   // เรียก data จาก มาก ไป น้อย
    //   let items = this.account.mockUserItems.sort((a, b) => {
    //     return Date.parse(b.updated.toString()) - Date.parse(a.updated.toString())
    //   })

    //   if (options && options.searchText && options.searchType) {
    //     items = this.account
    //       .mockUserItems
    //       .filter(result => {
    //         switch (options.searchType) {
    //           case 'update':
    //             return result.updated >= options.searchText['from'] && result.updated <= options.searchText['to']

    //           default:
    //             return result[options.searchType].toString().toLowerCase()
    //               .indexOf(options.searchText.toString().toLowerCase()) >= 0
    //         }
    //       })
    //   }
    //   resolve({ items: items.slice(startItem, endItem), totalItems: items.length })
    // })
  }

  getMemberById(id) {
    return this.http
      .requestGet(`api/member/${id}`, this.authen.getAuthenticated)
      .toPromise() as Promise<IAccount>

    // return new Promise<IAccount>((resolve, reject) => {
    //   const member = this.account.mockUserItems.find(item => item.id == id)
    //   if (!member) return reject({ Message: 'Not found id in system' })
    //   resolve(member)
    // })
  }

  createMember(model: IAccount) {
    return this.http
      .requestPost('api/member', model, this.authen.getAuthenticated)
      .toPromise() as Promise<IAccount>

    // return new Promise<IAccount>((resolve, rejaect) => {
    //   if (this.account.mockUserItems.find(item => item.email == model.email))
    //     return rejaect({ Message: 'That email is taken. Try anaother' })

    //   model.id = Math.random()
    //   model.created = new Date()
    //   model.updated = new Date()
    //   this.account.mockUserItems.push(model)
    //   resolve(model)
    // })
  }

  deleteMember(id: any) {
    return this.http
      .requestDelete(`api/member/${id}`, this.authen.getAuthenticated)
      .toPromise() as Promise<number>

    // return new Promise((resolve, reject) => {
    //   const findIndex = this.account.mockUserItems.findIndex(item => item.id == id)
    //   if (findIndex < 0) return reject({ Message: 'Not data in system.' })

    //   resolve(this.account.mockUserItems.splice(findIndex, 1))
    // })
  }

  updateMember(id: any, model: IAccount) {
    return this.http
      .requestPut(`api/member/${id}`, model, this.authen.getAuthenticated)
      .toPromise() as Promise<IAccount>

    // return new Promise<IAccount>((resolve, reject) => {
    //   const member = this.account.mockUserItems
    //     .find(item => item.id == id)
    //   if (!member) return reject({ Message: 'Not found data.' })

    //   const checkEmail = this.account.mockUserItems
    //     .find(item => item.email == model.email && model.email != member.email)
    //   if (checkEmail) return reject({ Message: 'Email is Dupicate.' })

    //   member.email = model.email
    //   member.password = model.password || member.password
    //   member.firstname = model.firstname
    //   member.lastname = model.lastname
    //   member.position = model.position
    //   member.role = model.role
    //   member.image = model.image
    //   member.updated = new Date()
    //   resolve(member)
    // })
  }

  private generateMembers() {
    const position = ['Angular Developer', 'NodeJS Developer']
    const role = [IRoleAccount.Admin, IRoleAccount.Employee, IRoleAccount.Member]
    // this.account.mockUserItems.splice(2)

    for (let i = 4; i <= 100; i++) {
      this.account.mockUserItems.push({
        firstname: `First Name-${i}`,
        lastname: `Last Name-${i}`,
        email: `mail-${i}@hotmail.com`,
        password: '123456',

        id: i.toString(),
        position: position[Math.round(Math.random())],
        image: null,
        role: role[Math.round(Math.random() * 2)],
        created: new Date(),
        updated: new Date(2019, 0, Math.round(Math.random() * 21 + 1))
      })
    }
  }
}
import { Injectable } from "@angular/core"
import { IRegister } from "../../component/register/register.interface"
import { ILogin } from "../../component/login/login.interface"
import { IProfile } from "../../authentication/component/profile/profile.interface";
import { IChangePassword } from "../../authentication/component/profile/change-password/change-password.interface";
import { HttpService } from "src/app/services/http.service";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpService) { }

  public mockUserItems: IAccount[] = [
    {
      firstname: 'Admin',
      lastname: 'Phaiboon',
      email: 'touchfn@gmail.com',
      password: '123456',

      id: 1,
      position: 'Angular Developer',
      image: 'assets/img/test.jpg',
      role: IRoleAccount.Admin,
      created: new Date(),
      updated: new Date()
    },
    {
      firstname: 'Dryst',
      lastname: 'Employee',
      email: 'test01@gmail.com',
      password: '123456',

      id: 2,
      position: 'NodeJS Developer',
      image: null,
      role: IRoleAccount.Employee,
      created: new Date(),
      updated: new Date()
    },
    {
      firstname: 'Zeemckis',
      lastname: 'Member',
      email: 'test022@gmail.com',
      password: '123456',

      id: 3,
      position: 'NodeJS Developer',
      image: null,
      role: IRoleAccount.Member,
      created: new Date(),
      updated: new Date()
    }
  ]

  public UserLogin: IAccount = {} as any
  public setUserLogin(userLogin: IAccount) {
    this.UserLogin.id = userLogin.id
    this.UserLogin.firstname = userLogin.firstname
    this.UserLogin.lastname = userLogin.lastname
    this.UserLogin.email = userLogin.email
    this.UserLogin.password = userLogin.password
    this.UserLogin.image = userLogin.image
    this.UserLogin.position = userLogin.position
    this.UserLogin.role = userLogin.role
    this.UserLogin.created = userLogin.created
    this.UserLogin.updated = userLogin.updated

    return this.UserLogin
  }

  onLogin(model: ILogin) {
    return this.http
      .requestPost('api/account/login', model)
      .toPromise() as Promise<{ accessToken: string }>

    // return new Promise<{ accessToken: string }>((resolve, reject) => {
    //   const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password)

    //   if (userLogin) resolve({ accessToken: userLogin.id })
    //   else return reject({ Message: 'Data Invalid! Email or Password is incorrect.' })
    // })
  }

  onRegister(model: IRegister) {
    return this.http
      .requestPost('api/account/register', model)
      .toPromise() as Promise<IAccount>

    // return new Promise((resolve, reject) => {
    //   if (model) {
    //     model['id'] = Math.random()
    //     model['position'] = ''
    //     model['role'] = IRoleAccount.Member
    //     model['image'] = '../../../assets/img/no-image-profile.png'
    //     model['created'] = new Date()
    //     model['updated'] = new Date()

    //     this.mockUserItems.push(model)
    //     resolve(model)
    //   }
    //   else reject({ Message: 'Error from server.' })
    // })
  }

  getUserLogin(accessToken: string) {
    return (this.http
      .requestGet('api/member/data', accessToken)
      .toPromise() as Promise<IAccount>)
      .then(userLogin => this.setUserLogin(userLogin))

    // return new Promise<IAccount>((resolve, reject) => {
    //   const userLogin = this.mockUserItems.find(item => item.id == accessToken)
    //   if (!userLogin) return reject({ Message: 'AccessToken Not Found!' })
    //   else resolve(userLogin)
    // })
  }

  onUpdateProfile(accessToken: string, model: IProfile) {
    return (this.http
      .requestPost('api/member/profile', model, accessToken)
      .toPromise() as Promise<IAccount>)
      .then(user => this.setUserLogin(user))

    // return new Promise((resolve, reject) => {
    //   const userProfile = this.mockUserItems.find(item => item.id == accessToken)

    //   if (!userProfile) return reject({ Message: 'AccessToken Not Found!' })
    //   else {
    //     userProfile.firstname = model.firstname
    //     userProfile.lastname = model.lastname
    //     userProfile.position = model.position
    //     userProfile.image = model.image
    //     userProfile.updated = new Date()
    //     resolve(userProfile)
    //   }
    // })
  }

  onChangePassword(accessToken: string, model: IChangePassword) {
    return this.http
      .requestPost('api/member/change-password', model, accessToken)
      .toPromise() as Promise<IAccount>

    // return new Promise((resolve, reject) => {
    //   const userProfile = this.mockUserItems.find(item => item.id == accessToken)
    //   if (!userProfile) return reject({ Message: 'AccessToken Not Found!' })
    //   else {
    //     if (userProfile.password != model.old_pass)
    //       return reject({ Message: 'Old Password not success!' })

    //     userProfile.password = model.new_pass
    //     userProfile.updated = new Date()
    //     resolve(userProfile)
    //   }
    // })
  }
}

export interface IAccount {
  firstname: string
  lastname: string
  email: string
  password: string

  id?: any
  position?: string
  image?: string
  role?: IRoleAccount
  created?: Date
  updated?: Date
}

export enum IRoleAccount {
  Member = 1,
  Employee,
  Admin
}
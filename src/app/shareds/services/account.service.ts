import { Injectable } from "@angular/core"
import { IRegister } from "../../component/register/register.interface"
import { ILogin } from "../../component/login/login.interface"
import { IProfile } from "../../authentication/component/profile/profile.interface";
import { IChangePassword } from "../../authentication/component/profile/change-password/change-password.interface";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  public mockUserItems: IAccount[] = [
    {
      firstname: 'Phaiboon',
      lastname: 'Withanthamrong',
      email: 'touchfn@gmail.com',
      password: '123456',

      id: 1,
      position: 'Angular Developer',
      image: 'assets/img/test.jpg',
      role: IRoleAccount.Employee,
      created: new Date(),
      updated: new Date()
    },
    {
      firstname: 'Dryst',
      lastname: 'Esgales',
      email: 'test01@gmail.com',
      password: '123456',

      id: 2,
      position: 'NodeJS Developer',
      image: null,
      role: IRoleAccount.Admin,
      created: new Date(),
      updated: new Date()
    }
  ]

  onLogin(model: ILogin) {
    return new Promise<{ accessToken: string }>((resolve, reject) => {
      const userLogin = this.mockUserItems.find(item => item.email == model.email && item.password == model.password)

      if (userLogin) resolve({ accessToken: userLogin.id })
      else return reject({ Message: 'Data Invalid! Email or Password is incorrect.' })
    })
  }

  onRegister(model: IRegister) {
    return new Promise((resolve, reject) => {
      if (model) {
        model['id'] = Math.random()
        model['position'] = 'Angular Developer'
        model['image'] = '../../../assets/img/test.jpg'
        model['created'] = new Date()
        model['updated'] = new Date()

        this.mockUserItems.push(model)
        resolve(model)
      }
      else reject({ Message: 'Error from server.' })
    })
  }

  getUserLogin(accessToken: string) {
    return new Promise<IAccount>((resolve, reject) => {
      const userLogin = this.mockUserItems.find(item => item.id == accessToken)
      if (!userLogin) return reject({ Message: 'AccessToken Not Found!' })
      else resolve(userLogin)
    })
  }

  onUpdateProfile(accessToken: string, model: IProfile) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItems.find(item => item.id == accessToken)

      if (!userProfile) return reject({ Message: 'AccessToken Not Found!' })
      else {
        userProfile.firstname = model.firstname
        userProfile.lastname = model.lastname
        userProfile.position = model.position
        userProfile.image = model.image
        userProfile.updated = new Date()
        resolve(userProfile)
      }
    })
  }

  onChangePassword(accessToken: string, model: IChangePassword) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItems.find(item => item.id == accessToken)
      if (!userProfile) return reject({ Message: 'AccessToken Not Found!' })
      else {
        if (userProfile.password != model.old_pass)
          return reject({ Message: 'Old Password not success!' })

        userProfile.password = model.new_pass
        userProfile.updated = new Date()
        resolve(userProfile)
      }
    })
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
  Member,
  Employee,
  Admin
}
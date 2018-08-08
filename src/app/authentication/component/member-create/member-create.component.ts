import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor() { }

  ngOnInit() {
  }

}

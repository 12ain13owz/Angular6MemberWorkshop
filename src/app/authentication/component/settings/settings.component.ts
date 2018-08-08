import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor() { }

  ngOnInit() {
  }

}

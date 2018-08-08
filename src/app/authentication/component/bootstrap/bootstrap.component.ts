import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
declare const App

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})

export class BootstrapComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor() { }

  ngOnInit() {
    App.BootstrapLoadPage()
  }

}

import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'

@Component({
  selector: 'app-uicards',
  templateUrl: './uicards.component.html',
  styleUrls: ['./uicards.component.css']
})
export class UicardsComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor() { }

  ngOnInit() {
  }

}

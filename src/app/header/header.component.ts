import { Component, Input, OnInit } from '@angular/core';
import { User } from '../model/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  isLoggedUser: boolean = false;
  
  myStorage: Storage = window.sessionStorage;

  constructor() {}

  ngOnInit(): void {
    const userData = User.fromStorage(this.myStorage)!;
    if(userData) {
      this.isLoggedUser = true;
    } else {
      this.isLoggedUser = false;
    }
  }

  cleanSession(): void{
    this.myStorage.clear();
    this.isLoggedUser = false;
  }

}

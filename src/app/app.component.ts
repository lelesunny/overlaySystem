import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BlueCoat Cloud Admin';
  User = "hahaha"
  // private User : string;
  ngOnInit() {
  //   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser.role == "2") {
  //     this.title = "BlueCoat cloud lab"
  //   }
  //   if (currentUser.role == "1") {
  //     this.title = "BlueCoat cloud Admin"
  //   } else {
  //     return false;
  //   }
  //   // reset login status
  }
  constructor() {
    // set token if saved in local storage

  }

}

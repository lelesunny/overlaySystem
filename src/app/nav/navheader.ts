import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthenticationService } from '../_services/index';



@Component({
  selector: 'bc-nav-header',
  templateUrl: './navheader.html',
  styleUrls: ['./navheader.css']
})
export class NavHeader implements OnInit {
  title = ' Example labs';
  User = "hahaha"
  private homePath: any = '/home';
  private isAdmin: boolean;
  // private User : string;
  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser.role == "admin") {
      this.homePath = '/admin/home';
      this.isAdmin = true;
    } else {
      return false;
    }
    // reset login status
  }
  constructor(private router: Router, private authenticationService: AuthenticationService
  ) {
    // set token if saved in local storage

  }


  redo() {
    //this.router.navigate(['/ssologin']);

    this.router.navigate(['/login']);
    // window.location.reload();

    // console.log("se")
    // this.authenticationService.logoutServer().subscribe(result => {
    //   // console.log(result);
    //   this.router.navigate([result.value]);

    //   //  window.location.reload();
    // }, error => {
    //   console.log(error);

    //   // self.loading = false;
    //   event.preventDefault
    //   this.router.navigate(['/login']);

    // });

  }

}

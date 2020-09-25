import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
// *ngIf is not found error was showing but by changing this file modules where loaded
// even browser module in app.module.ts is configring *ngIf
// import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  login(){
    this.authService.login(this.model).subscribe( next => {
      this.alertify.success('Logged in Successfully');
    },
    error => {
      this.alertify.error(error);
    }, () =>{
      this.router.navigate(['/members']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

}

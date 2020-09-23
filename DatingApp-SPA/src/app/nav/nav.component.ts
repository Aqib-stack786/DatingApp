import { Component, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }
  // tslint:disable-next-line:typedef
  login(){
    this.authService.login(this.model).subscribe( next => {
      console.log('Logged in Successfully');
    },
    error => {
      console.log('Failed to Login');
    });
  }
  // tslint:disable-next-line:typedef
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
    /*!!token means if token exist return true*/
  }

  // tslint:disable-next-line:typedef
  logout(){
    localStorage.removeItem('token');
    console.log('logged out');
  }

}

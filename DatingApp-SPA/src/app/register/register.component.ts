import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // receive input from parent compnent use input
  // @Input() valuesFromHome: any;
  // send output to paernt componet use  output variable
  // output property is emmit evenet means?
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  register(){
    this.authService.register(this.model).subscribe(() => {
      console.log('registration successful');
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line:typedef
  cancel(){
    // what is event emitter in angular
    this.cancelRegister.emit(false);
  }

}

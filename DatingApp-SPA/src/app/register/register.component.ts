import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
// this form is reactive form
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // receive input from parent compnent use input
  // @Input() valuesFromHome: any;
  // send output to parent componet use  output variable
  // output property is emmit evenet means?
  @Output() cancelRegister = new EventEmitter();
  // model: any = {};
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    this.createRegistrationForm();
  }
  createRegistrationForm(){
    this.registerForm =  this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  register(){
    if (this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration Succesful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
  }
  // tslint:disable-next-line:typedef
  cancel(){
    // what is event emitter in angular
    this.cancelRegister.emit(false);
  }

}
// in ngOnInit
// this.registerForm =  new FormGroup({
//   username: new FormControl('', Validators.required),
//   password: new FormControl('',
//     [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
//   confirmPassword: new FormControl('', Validators.required)
// }, this.passwordMatchValidator);

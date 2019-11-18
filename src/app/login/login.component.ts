import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from '../login';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  loginuser: Login = new Login();

  constructor(private authservice: AuthService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
   
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authservice.login(this.loginForm.value).subscribe(x=> {
      x.forEach(element => {
        this.loginuser.role_id == element["role_id"];
        console.log(this.loginuser.role_id);
        if (this.loginuser.role_id == 1) {
          this.router.navigate(['products'])
        }
        else{
          this.router.navigate([''])
        }
      })
    });

  }
}

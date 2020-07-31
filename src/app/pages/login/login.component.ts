import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router,
              private loginService: LoginService,
              private formBuilder: FormBuilder) { }

  isRegistering: boolean;
  userForm: FormGroup;

  ngOnInit(): void {
    this.isRegistering = false;
    this.createNewUserform();
  }
  signIn(): void{
    this.router.navigate(['/users']);
  }
  signUpbutton(): void{
    this.isRegistering = true;
  }
  goBackButtom(): void {
    this.isRegistering = false;
  }
  signUp(): void{
    this.loginService.signUpUser({email: 'userPrueba', password: '!1234'}).subscribe(
      user => {
        console.log("usuario añadido");
        console.log(user);
      }
    );
  }
  createNewUserform(): void{
    this.userForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
  onFormSubmit(form): void{
    if (form.status === 'VALID') {
      this.loginService.signUpUser(form.value).subscribe(newUser => {
        console.log(newUser);
        this.isRegistering = false;
      });
    }
  }
}

import { activity } from './../../models/activity';
import { switchMap } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  add: [] = [];
  signUpForm = new FormGroup({
    displayName: new FormControl('',Validators.required ),
    firstName: new FormControl('',Validators.required ),
    lastName: new FormControl('',Validators.required ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  }, {validators: passwordsMatchValidator()}
  );

  constructor(private authService: AuthenticationService, private usersService:UsersService ,private toast: HotToastService, private route: Router) {

   }

  emailLeft = false;
  displayNameLeft = false;
  firstNameLeft = false;
  lastNameLeft = false;
  passwordLeft = false;
  confirmPasswordLeft = false;

  ngOnInit(): void {
  }

  submit(){
    if(!this.signUpForm.valid){
      return;
    }
    const{displayName, firstName, lastName, email, password} = this.signUpForm.value;


    this.authService.signUp(email,password).pipe(
      switchMap((user) => this.usersService.addUser({uid:user?.uid, email, displayName, firstName, lastName, exp: 0, activities: []} )),
      this.toast.observe({
        success: 'Conta criada! Seja Bem-vindo(a)!!',
        loading: 'Encontrando galáxia mais próxima...',
        error: `Este email já está sendo utilizado em outra conta!`

      })
    ).subscribe(() =>{
      this.route.navigate(['/home'])
    })
  }

  get displayName(){
    return this.signUpForm.get('displayName');
  }
  get firstName(){
    return this.signUpForm.get('firstName');
  }
  get lastName(){
    return this.signUpForm.get('lastName');
  }

  get email(){
    return this.signUpForm.get('email')
  }

  get password(){
    return this.signUpForm.get('pasword')
  }

  get confirmPassword(){
    return this.signUpForm.get('confirmPassword')
  }
}

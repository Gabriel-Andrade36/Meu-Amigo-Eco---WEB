import { HotToastService } from '@ngneat/hot-toast';
import { Router} from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
})

emailLeft = false;
passwordLeft = false;

  constructor(private authService : AuthenticationService,private router: Router,private toast: HotToastService) { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  submit(){
    if(!this.loginForm.valid){
      return;
    }

    const {email, password} = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Bem-vindo!',
        loading: 'Alinhando os planetas...',
        error: 'Algo deu errado :C  Tente novamente'
      })
    ).subscribe(() =>{
      this.router.navigate(['/home'])
    });

  }
}

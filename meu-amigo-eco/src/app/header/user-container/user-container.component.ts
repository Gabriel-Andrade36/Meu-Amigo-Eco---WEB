import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  constructor(private authService: AuthenticationService, private route: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.route.navigate([''])
    });
  }
}

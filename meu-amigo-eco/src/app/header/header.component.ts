import { UsersService } from './../services/users.service';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  constructor(public authService: AuthenticationService, public usersService:UsersService) { }

  ngOnInit(): void {
  }

}

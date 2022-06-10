import { User } from '../models/User';
import { Injectable} from '@angular/core';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import {from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$= this.auth.authState;

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public route: Router,
    ) {}

  login(email: string, password: string){
    return from(this.auth.signInWithEmailAndPassword(email, password))
  }

  signUp( email: string, password: string){
    return from(this.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
      return user.user
    }
    ))
    }

  async updateProfileData(profileData:User){
    const user = this.auth.currentUser;

    return (await user)?.updateProfile(profileData)

  }

  logout(){
    return from(this.auth.signOut())
  }

}

import { User } from 'src/app/models/User';
import { AuthenticationService } from './authentication.service';
import { ProfileUser } from './../models/user-profile';
import { from, Observable, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userDoc!: AngularFirestoreDocument<ProfileUser>;
  user!: Observable<ProfileUser | undefined>;

  get currentUserProfile$(){
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if(!user?.uid){

          return of(null);
        }

        this.userDoc = this.firestore.doc<ProfileUser>(`users/${user.uid}`)
        this.user = this.userDoc.valueChanges()

        return  this.user;
      })
    )
  }

  constructor(private firestore: AngularFirestore, private authService: AuthenticationService) {

  }

  addUser(user: ProfileUser):Observable<any>{
      const ref = this.firestore.doc(`users/${user?.uid}`)
      return from(ref.set(user));
  }

  updateUser(user: ProfileUser): Observable<any>{
    const ref = this.firestore.doc(`users/${user?.uid}`)
    return from(ref.update({...user}));
  }

  updateExp(user: ProfileUser, xp: number){
    user.exp += xp;
    this.updateUser(user)
  }

  updateQuiz(user: ProfileUser, id: string, status: string){

    if(!user.quizzesDone){
      user.quizzesDone = [];
    }

    for (let index = 0; index < user.quizzesDone.length; index++) {
      if(user.quizzesDone[index].quiz_id == id){
        user.quizzesDone.splice(index, 1);
      }
    }

    user.quizzesDone.push({quiz_id:id,status})
    this.updateUser(user)
  }

  updateClass(user: ProfileUser, id: string){
    if(!user.classesDone){
      user.classesDone = [];
    }

    for (let index = 0; index < user.classesDone.length; index++) {
      if(user.classesDone[index].class_id == id){
        user.classesDone.splice(index, 1);
      }
    }

    user.classesDone.push({class_id:id,status: true});
    this.updateUser(user)
  }
}

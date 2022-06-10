import { activity } from './../models/activity';
import { ProfileUser } from './../models/user-profile';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/compat/firestore';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activitiesCollection!: AngularFirestoreCollection<activity>;
  activityDoc!: AngularFirestoreDocument<activity>;
  activities:Observable<activity[]>;

  private itemDoc!: AngularFirestoreDocument<ProfileUser>;
  item!: Observable<ProfileUser | undefined>;
  constructor( private readonly firestore: AngularFirestore, private usersService: UsersService) {
    this.activitiesCollection = firestore.collection<activity>('added-activities', ref => ref.orderBy('created','asc'));
    this.activities = this.activitiesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as activity;
        return data;
      })
      ))

      this.usersService.currentUserProfile$.pipe(untilDestroyed(this)).subscribe((user) =>
      {
        this.itemDoc = firestore.doc<ProfileUser>(`users/${user?.uid}`)
        this.item = this.itemDoc.valueChanges().pipe(
          map(user => {
            return user
          })
        );
      })

   }

  getUserActivities(){
    return this.item;
  }

   getActivies(){
     return this.activities;
   }

   addActivity(item: activity){
    this.activitiesCollection.add(item)
   }

   deleteActivity(activity: activity){
    this.activityDoc = this.firestore.doc(`added-activities/${activity.id}`);
    this.activityDoc.delete()
   }
}


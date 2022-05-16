import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection,  AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { IActivity } from './../models/IActivity';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activitiesCollection: AngularFirestoreCollection<IActivity>;
  activities:Observable<IActivity[]>;

  constructor(public afs: AngularFirestore) {
    this.activitiesCollection = afs.collection<IActivity>('added-activity');
    this.activities = this.activitiesCollection.valueChanges();
    //What valueChanges() does, is, it returns or collections as a observable
   }

   getActivies(){
     return this.activities;
   }
}


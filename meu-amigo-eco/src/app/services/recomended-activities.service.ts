import { ProfileUser } from './../models/user-profile';
import { UsersService } from 'src/app/services/users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecomendedActivity } from './../models/recomended_activity';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecomendedActivitiesService {
  private recomendedActivitiesCollection!: AngularFirestoreCollection<RecomendedActivity>;
  recomendedActivities!: Observable<RecomendedActivity[]>


  constructor(private firebase: AngularFirestore, private usersService: UsersService) {
    this.recomendedActivitiesCollection = firebase.collection<RecomendedActivity>('recomended-activities');
    this.recomendedActivities = this.recomendedActivitiesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as RecomendedActivity;

        return data;
      })
      )
    )
  }

  get RecomendedActivities(){
    return this.recomendedActivities
  }
}

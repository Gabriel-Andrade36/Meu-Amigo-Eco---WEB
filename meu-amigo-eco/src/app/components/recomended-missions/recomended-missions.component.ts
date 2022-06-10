import { ProfileUser } from './../../models/user-profile';
import { UsersService } from 'src/app/services/users.service';
import { activity } from './../../models/activity';
import { map } from 'rxjs/operators';
import { RecomendedActivitiesService } from './../../services/recomended-activities.service';
import { RecomendedActivity } from './../../models/recomended_activity';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-recomended-missions',
  templateUrl: './recomended-missions.component.html',
  styleUrls: ['./recomended-missions.component.scss']
})
export class RecomendedMissionsComponent implements OnInit{
  recomendedActivities: RecomendedActivity[] = [];
  user$ = this.usersService.currentUserProfile$
  userActivities!: activity[];
  constructor(private activitiesService : RecomendedActivitiesService, private usersService: UsersService) { }

  ngOnInit(): void {

    this.usersService.currentUserProfile$.pipe(
      map((user) => {
        if(!user?.activities){
        this.userActivities = [];
        return user;
        }
        // fazer um for pra filtrar apenas as atividades que tem o isRecomended como true;
        this.userActivities = user?.activities
        return user
      })
    ).subscribe(()=>{
      this.activitiesService.RecomendedActivities.subscribe((recomendedActivities)=>{
        this.recomendedActivities = recomendedActivities;
        for (let uaIndex = 0; uaIndex < this.userActivities.length; uaIndex++) {
          for (let raIndex = 0; raIndex < recomendedActivities.length; raIndex++) {
            if(this.recomendedActivities[raIndex].id === this.userActivities[uaIndex].id){
              this.recomendedActivities.splice(raIndex, 1)
            }
          }
        }
      })
    });
  }


  saveMissionOnProfile(user: ProfileUser, activity: RecomendedActivity){
    let date = new Date()
    let activities: activity[] = []
    let activityData: activity = {
      title : activity.title,
      description : activity.description,
      xp: activity.xp,
      isRecomended: true,
      created : `${(new Date).getDate()}/${date.getMonth()+1}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`,
      id: activity.id
    };

    if(user.activities){
      activities = user.activities;
    }

    activities.push(activityData);
    user.activities = activities;

    this.usersService.updateUser(user)
    this.usersService.updateExp(user, activity.xp)


  }
}

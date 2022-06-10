import { map } from 'rxjs/operators';
import { activity } from './../../models/activity';
import { ProfileUser } from './../../models/user-profile';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
  animations:[

  ]
})
export class AddActivityComponent implements OnInit {
  activity: activity = {
    title:'',
    description:'',
    created:'',
    isRecomended:false,
    xp:10
  }
  activities : activity[] = [];
  onActivities:number = 0;

  ActivityTextValue = "";
  activiesButtonText = "Atividades recentes \\/";
  isActiviesHistoricOpen = false;

  userProfile$ = this.usersService.currentUserProfile$;
  constructor(
    private usersService: UsersService
    ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
    map((user)=>{
      if(!user?.activities){
      return user;
      }
      this.activities = user.activities;

      this.activities.sort((a,b)=> a.created.localeCompare(b.created)).reverse()
      return user;
    })
    ).subscribe()



  }

  onSubmit(user:ProfileUser){
    if(this.activity.title !='' && this.activity.description != ''){
      let date = new Date()
      this.activity.created = `${(new Date).getDate()}/${date.getMonth()+1}/${date.getFullYear()} as ${date.getHours()}:${date.getMinutes()}`;
      this.activity.xp = 10;

      this.activities.push(this.activity);
      user.activities = this.activities;
      this.usersService.updateUser(user);
      this.usersService.updateExp(user, this.activity.xp);

      this.activity.description = '';
      this.activity.title = '';
    }

  }

  deleteActivity(user: ProfileUser, index: number, xp: number){
    this.activities.splice(index,1);
    user.activities = this.activities;
    this.usersService.updateUser(user)
    this.usersService.updateExp(user, -xp)

  }

  onActiviesButton(){
    this.isActiviesHistoricOpen = !this.isActiviesHistoricOpen;
  }

  nextActivities(){

  if(!this.onActivities){
    this.onActivities = 0;
  }

  if(this.onActivities >= this.activities.length-4){
    return
  }

  this.onActivities = this.onActivities + 4;
  }
  previousActivities(){
  if(!this.onActivities){
    this.onActivities = 0;
  }

  if(this.onActivities < 4){
    return
  }

  this.onActivities = this.onActivities - 4;
  }
}

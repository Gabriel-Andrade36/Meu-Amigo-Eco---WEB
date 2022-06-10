import { ProfileUser } from './../../models/user-profile';
import { User } from 'src/app/models/User';
import { UsersService } from './../../services/users.service';
import { FormGroup, FormControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, lastValueFrom } from 'rxjs';
import { ImageUploadService } from './../../services/image-upload.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),//When we send the user back to update, we will use the uid to find the user.
    displayName: new FormControl(''),
  })

  constructor(
    private authService: AuthenticationService,
    private imageUploadService : ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService
    ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
    .pipe(untilDestroyed(this)
    ).subscribe((user)=>{
      this.profileForm.patchValue({displayName :user?.displayName, uid : user?.uid});
    })
  }

  uploadImage(event: any, user: ProfileUser ){

    this.imageUploadService.uploadImage(event.target.files[0],`images/profile/${user.uid}`).pipe(
       this.toast.observe(
         {
           loading: 'Aguardando o entregador trazer sua foto',
           success: 'Sua foto chegou!',
           error: 'Algo deu errado :C'
         }
       )
       ,
       concatMap((photoURL) => this.usersService.updateUser({uid: user.uid,photoURL, exp: user.exp}))
    ).subscribe();


  }

  saveProfile(){
    const profileData = this.profileForm.value;
    console.log(this.profileForm.value)
    this.usersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Anotando novas informaçoes',
        success: 'Tudo certo',
        error: 'algo deu errado :C'
      })
    ).subscribe();
  }

}

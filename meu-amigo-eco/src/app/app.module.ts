import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthenticationService } from './services/authentication.service';
import { initializeApp } from 'firebase/app';
import { LoginLogoutComponent } from './header/login-logout/login-logout.component';

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

//Angular Fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppComponent } from './app.component';
import { LearnWithEcoComponent } from './components/learn-with-eco/learn-with-eco.component';
import { EcoQuizComponent } from './components/eco-quiz/eco-quiz.component';
import { RecomendedMissionsComponent } from './components/recomended-missions/recomended-missions.component';
import { HeaderComponent } from './header/header.component';
import { UserContainerComponent } from './header/user-container/user-container.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';

import { LandingComponent } from './components/landing/landing.component';

import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { PresentationPageComponent } from './components/presentation-page/presentation-page.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { EcoQuizPageComponent } from './components/eco-quiz/eco-quiz-page/eco-quiz-page.component';
import { EcoClassesPageComponent } from './components/learn-with-eco/eco-classes-page/eco-classes-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserContainerComponent,
    RecomendedMissionsComponent,
    EcoQuizComponent,
    LearnWithEcoComponent,
    AddActivityComponent,
    LoginLogoutComponent,
    LandingComponent,
    LoginPageComponent,
    SignupPageComponent,
    PresentationPageComponent,
    ProfileDashboardComponent,
    EcoQuizPageComponent,
    EcoClassesPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp((environment.firebase), 'meu-amigo-eco'),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HotToastModule.forRoot()

  ],
  providers: [AuthenticationService
],
  bootstrap: [AppComponent]
})
export class AppModule { }

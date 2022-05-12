import { LearnWithEcoComponent } from './components/learn-with-eco/learn-with-eco.component';
import { EcoQuizComponent } from './components/eco-quiz/eco-quiz.component';
import { RecomendedMissionsComponent } from './components/recomended-missions/recomended-missions.component';
import { HeaderComponent } from './header/header.component';
import { UserContainerComponent } from './header/user-container/user-container.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserContainerComponent,
    RecomendedMissionsComponent,
    EcoQuizComponent,
    LearnWithEcoComponent,
    AddActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, Timestamp, query, where, getDocs } from "firebase/firestore"
import { doc, getDoc } from "firebase/firestore";
import { timestamp } from 'rxjs';

// const firebaseConfig = {

// };
// let db:any = "";

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
  animations:[

  ]
})
export class AddActivityComponent implements OnInit {

  public placeholder_text = "Insira aqui a atividade realizada por você";
  public placeholder_baseText = "Insira aqui a atividade realizada por você";
  private hovering = false;
  public ActivityTextValue = "";
  public activiesButtonText = "Atividades recentes \\/";
  public isActiviesHistoricOpen = false;
  public activiesList= [
    {activity:'a',created:"um dia ae" },
    {activity:'b',created:"hoje"},
    {nome:'c',created:"num sei"}
  ];

  
  constructor(private activityService: ActivityService) {

  }

  ngOnInit(): void {

  }

  async createActivity(){

    alert("Activity Added")
  }

  onPlaceholderHover(){
    this.hovering = !this.hovering;

    if(!this.hovering){
      this.placeholder_text = this.placeholder_baseText;
    }else{
      this.placeholder_text = "";
    }
  }

  onActiviesButton(){
    this.isActiviesHistoricOpen = !this.isActiviesHistoricOpen;

    if(this.isActiviesHistoricOpen === true){
      this.activiesButtonText = "atividades recentes /\\"
    }else{
      this.activiesButtonText = "atividades recentes \\/"
    }
  }

}

import { Component, OnInit } from '@angular/core';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

@Component({
  selector: 'app-recomended-missions',
  templateUrl: './recomended-missions.component.html',
  styleUrls: ['./recomended-missions.component.scss']
})
export class RecomendedMissionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

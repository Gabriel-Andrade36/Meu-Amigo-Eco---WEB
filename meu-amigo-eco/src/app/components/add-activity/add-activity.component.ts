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

const firebaseConfig = {
  apiKey: "AIzaSyBtivTrUzaHMydD1s0BAxKcdZ7I1K8Dn_k",
  authDomain: "meu-amigo-eco.firebaseapp.com",
  projectId: "meu-amigo-eco",
  storageBucket: "meu-amigo-eco.appspot.com",
  messagingSenderId: "668164334411",
  appId: "1:668164334411:web:a2721e7119981ede747ece"
};
let db:any = "";

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
  public activiesList1= [
    {activity:'a',created:"um dia ae" },
    {activity:'b',created:"hoje"},
    {nome:'c',created:"num sei"}
  ];
  public activiesList= [
    {activity:'',created:"" },
  ]

  constructor() {

  }

  ngOnInit(): void {
    const  app = initializeApp(firebaseConfig);
    db = getFirestore(app);

    this.testing()
  }

  async createActivity(){
    try {
      const docRef = await addDoc(collection(db, "added-activity"), {
        activity: this.ActivityTextValue, created: Timestamp.fromDate(new Date())
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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

  async testing(){
    // const docRef = doc(db, "added-activity");
    // const docSnap = await getDoc(docRef);

    const q = query(collection(db, "added-activity"))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   alert("No such document!");
    // }
  }

}

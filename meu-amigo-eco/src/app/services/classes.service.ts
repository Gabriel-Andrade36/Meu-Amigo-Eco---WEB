import { Observable } from 'rxjs';
import { Class } from './../models/class';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  classesCollection!:AngularFirestoreCollection<Class>;
  classes!: Observable<Class[]>
  classDoc!:AngularFirestoreDocument<Class>;
  class!:Observable<Class | undefined>;
  constructor(private firestore: AngularFirestore) {
    this.classesCollection = firestore.collection<Class>('classes');
    this.classes = this.classesCollection.valueChanges()
   }

   get Classes(){
     return this.classes;
   }

   getClass(class_id: string){
    this.classDoc = this.firestore.doc<Class>(`classes/${class_id}`)
    this.class = this.classDoc.valueChanges()

    return this.class;
   }
}

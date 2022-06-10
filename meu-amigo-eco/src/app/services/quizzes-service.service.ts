import { QuizQuestion } from './../models/quiz-question';
import { Observable } from 'rxjs';
import { Quiz } from './../models/quiz';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  quizzesCollection!: AngularFirestoreCollection<Quiz>;
  quizzes!: Observable<Quiz[]>;
  quizDoc!: AngularFirestoreDocument<Quiz>
  quiz!:Observable<Quiz | undefined>
  constructor(private firestore: AngularFirestore) {
    this.quizzesCollection = firestore.collection<Quiz>('quizzes')
    this.quizzes = this.quizzesCollection.valueChanges()
   }


  get Quizzes(){
  return this.quizzes
  }

  getQuiz(quiz_id:string){
  this.quizDoc = this.firestore.doc<Quiz>(`quizzes/${quiz_id}`)
  this.quiz = this.quizDoc.valueChanges()

  return this.quiz;
  }

  }

import { ProfileUser } from './../../../models/user-profile';
import { UsersService } from './../../../services/users.service';
import { Quiz } from './../../../models/quiz';
import { QuizzesService } from './../../../services/quizzes-service.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-eco-quiz-page',
  templateUrl: './eco-quiz-page.component.html',
  styleUrls: ['./eco-quiz-page.component.scss']
})
export class EcoQuizPageComponent implements OnInit, OnChanges {
  quizId!: string;
  quizzes!: Quiz[];
  user!: ProfileUser;
  selectedQuiz!: Quiz;
  gotItRight: boolean = true;
  feedback: any[] = [];

  onAnswer = -1;
  onQuiz = false;
  onQuestion = 0;

  user$ = this.usersService.currentUserProfile$;
  constructor(private quizzesService: QuizzesService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.subscribe((userData)=>{
      if(userData){
        this.user = userData
      }
      this.quizzesService.Quizzes.subscribe((quizzes)=>{
        this.quizzes = quizzes;
        for (let index = 0; index < quizzes.length; index++) {
          this.quizzes[index].status = this.quizStatus(quizzes[index].id)
        }
      })
    })
  }

  ngOnChanges(): void{
    this.quizzesService.Quizzes.subscribe((quizzes)=>{
      this.quizzes = quizzes;
      for (let index = 0; index < quizzes.length; index++) {
        this.quizzes[index].status = this.quizStatus(quizzes[index].id)
      }
    })
    this.usersService.currentUserProfile$.subscribe((userData)=>{
    if(userData){
      this.user = userData
    }
  })
  }

  quizStatus(id: string){

    if(this.user.quizzesDone){
      for (let i = 0; i < this.user.quizzesDone.length; i++) {
        if(this.user.quizzesDone[i].quiz_id == id){
          return this.user.quizzesDone[i].status;
        }
      }
    }
    return false;
  }

  quizInOut(id?:string){
    if(id){
      this.quizId =id;
      this.gotItRight = true;
      this.feedback = [];
      this.getQuiz();
    }
    this.onQuestion = 0;
    this.onQuiz = !this.onQuiz
  }

  getQuiz(){
  this.quizzesService.getQuiz(this.quizId).subscribe((quiz)=>{
  if(quiz){
    quiz.status = this.quizStatus(quiz.id)
    if(quiz.status === "realizado"){
      quiz.xp = 0;
    }
    this.selectedQuiz = quiz;
  }
  return quiz;
  })
  }

  nextQuestion(rightAnswer: number){
    if(this.onAnswer >= 0){
      this.onQuestion++
      if(this.onAnswer === rightAnswer){
        this.feedback.push(true)
        console.log(this.feedback)
      }else{
        this.feedback.push(false)
        console.log(this.feedback)
        this.gotItRight = false;
      }

      this.onAnswer = -1;
    }
  }

  endQuiz(rightAnswer: number, user: ProfileUser){
    this.nextQuestion(rightAnswer)

    if(this.gotItRight){
    this.usersService.updateExp(user, this.selectedQuiz.xp);
    this.usersService.updateQuiz(user,this.selectedQuiz.id, 'realizado');

    }else{
      if(this.selectedQuiz.status !='realizado'){
        this.usersService.updateQuiz(user,this.selectedQuiz.id, 'errou')
      }
    }


  }

  removeXp(){
    this.selectedQuiz.xp = 0;
  }

  answerSelected(index:number){
    this.onAnswer = index;
  }
}

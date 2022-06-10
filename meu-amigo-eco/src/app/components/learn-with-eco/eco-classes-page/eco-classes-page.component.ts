import { QuizzesService } from './../../../services/quizzes-service.service';
import { ProfileUser } from './../../../models/user-profile';
import { Class } from './../../../models/class';
import { ClassesService } from './../../../services/classes.service';
import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-eco-classes-page',
  templateUrl: './eco-classes-page.component.html',
  styleUrls: ['./eco-classes-page.component.scss']
})
export class EcoClassesPageComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$
  user!: ProfileUser;
  classId!:string;
  classes!: Class[];

  onAClass:boolean = false;//CHANGE TO FALSE
  onText = 0;
  selectedClass!: Class;
  ecoIcon = [
    '../../../../assets/eco-icons/icon-eco-friendly.svg',
    '../../../../assets/eco-icons/two-leaves.svg',
    '../../../../assets/eco-icons/globe.svg',
    '../../../../assets/eco-icons/plant.svg',
    '../../../../assets/eco-icons/electric-bulb.svg',
    '../../../../assets/eco-icons/plant2.svg',
    '../../../../assets/eco-icons/leaf.svg',
    '../../../../assets/eco-icons/eco-friendly-world.svg',
    '../../../../assets/eco-icons/bulb-yellow-bg.svg','../../../../assets/eco-icons/electric-bulb.svg'
    ]
  constructor(private usersService: UsersService, private classesService: ClassesService) {

  }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.subscribe((userData)=>{
      if(userData){
        this.user = userData
      }
      this.classesService.Classes.subscribe((classes)=>{
        this.classes = classes;
        for (let index = 0; index < classes.length; index++) {
          this.classes[index].status = this.classStatus(classes[index].id)
        }
      })
    })
  }

  lastNumber(n: number){
    let lastDigit =  n % 10;
    let LastDigitInString = lastDigit.toString().slice(-1)
    lastDigit= Number(LastDigitInString)
    return lastDigit;
  }


  classStatus(id:string){

    if(this.user.classesDone){
      for (let i = 0; i < this.user.classesDone.length; i++) {
        if(this.user.classesDone[i].class_id == id){
          return true;
        }
      }
    }
    return false;
  }

  InOutClass(id?:string){
    if(id){
      this.classId=id;
      this.getClass();
    }
    this.onText =0;
    this.onAClass = !this.onAClass
    this.getClass()
  }

  getClass(){
    this.classesService.getClass(this.classId).subscribe((c)=>{
      if(c){
        c.status = this.classStatus(c.id)
        if(c.status === true){
          c.xp = 0;
        }
        this.selectedClass = c;
      }
      return c;
    })
  }

  nextClass(){
    this.onText++
  }

  completeClass(xp: number, id: string){
    this.nextClass();
    this.usersService.updateExp(this.user, xp);
    this.usersService.updateClass(this.user,id)
  }

  previousClass(){
    this.onText--
  }
}

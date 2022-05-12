import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  constructor() { }

  ngOnInit(): void {

  }

  onPlaceholderHover(){
    this.hovering = !this.hovering;

    if(!this.hovering){
      this.placeholder_text = this.placeholder_baseText;
    }else{
      this.placeholder_text = "";
    }
  }

}

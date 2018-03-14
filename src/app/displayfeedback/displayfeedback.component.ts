import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import { UserTable, QuestionAnswer, Question, ChoiceRange, QuestionOption, Survey, Training, User, SurveySection, OptionGroup } from '../classes';



@Component({
  selector: 'app-displayfeedback',
  templateUrl: './displayfeedback.component.html',
  styleUrls: ['./displayfeedback.component.css']
})
export class DisplayfeedbackComponent implements OnInit {

  constructor(public feedbackService: FeedbackService) { }
  questions1: Question[];
  questions2: Question[];
  questions3: Question[];
  trainings: Training[];
  trainingID: number;
  datas:Survey[];


  ngOnInit() {
   
    
    this.getTrainings();
    
  }
  onSelectionChange(entry) {
    this.trainingID = entry;
    this.getQuestions();
    this.getAnswers(this.trainingID);
  }
  
  getAnswers(id){
    this.feedbackService.getAnswers(id).subscribe((res) => this.datas = res);
  }
  
  getQuestions() {
    this.feedbackService.getQuestions(1).subscribe((section1) => this.questions1 = section1);
    
    this.feedbackService.getQuestions(2).subscribe((section2) => this.questions2 = section2);
    this.feedbackService.getQuestions(3).subscribe((section3) => this.questions3 = section3);
    
  }
  getTrainings() {
    this.feedbackService.getTrainings().subscribe((details) => this.trainings = details);
  }


}
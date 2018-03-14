import { Component, OnInit } from '@angular/core';
import {  QuestionAnswer, Question, ChoiceRange, QuestionOption, Survey, Training, User, SurveySection, OptionGroup, Admin } from '../classes';
import { FeedbackService } from '../feedback.service';


import { DialogComponent, DialogService } from "ng2-bootstrap-modal";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(public feedbackService: FeedbackService) {
    this.QAvalues = new Array<QuestionAnswer>();
    this.surveys = new Array<Survey>();

  }
 
  showDialog = false;
  showDialog1 = false;
  showDialog2 = false;
  questions1: Question[];
  questions2: Question[];
  questions3: Question[];
  trainings: Training[];
  survey = new Survey();
  surveys: Survey[];
  trainingID: number;
  selectedParameter: number;
  program: string;
  errormsg:string;
  //description: string;
  entries = [];
  id:number;
  items = this.trainings;
  QAvalues: QuestionAnswer[];
  
  onSelectionChange(entry) {
    this.trainingID = entry;
  }
  
  onSelect(parameter: number) {
  
    this.selectedParameter = parameter;
   
  }
  
  confirm(id) {

    var QAvalue = new QuestionAnswer();
    for(var i=0;i<this.QAvalues.length;i++)
    {
    if(this.QAvalues[i].QuestionId==id)
    {
      this.QAvalues[i].Answer=this.program;
      return;
    }
        
  }
     
    if(id==6 || id==7)
    {
      
      if(this.program=="1")
      {
        this.program="YES";
      }
      if(this.program=="2")
      {
        this.program="NO";
      }
      if(this.program=="3")
      {
        this.program="NONE";
      }
    }
    
    QAvalue.Answer = this.program;
    QAvalue.QuestionId = id;
    this.QAvalues.push(QAvalue);
    console.log("Logged")
    //console.log(this.QAvalues.length);

  }
 
  SubmitForm() {
    
    if(this.QAvalues.length!=17)
    {
       this.errormsg="Enter feedback for all questions";
       return;
    }
   
    for (let value of this.QAvalues) {
      var survey = new Survey();
     
      survey.SurveyID = 1;
      survey.TrainingID = this.trainingID;
      survey.QuestionID = value.QuestionId
      survey.Answers = value.Answer;
   
      this.surveys.push(survey);
console.log("Form Submitted");
      
    }
    
    this.feedbackService.submitAnswer(this.surveys).subscribe();
    window.location.reload();
  
  }
  




  getQuestions() {
  
    this.feedbackService.getQuestions(1).subscribe((section1) => this.questions1 = section1);
    
    this.feedbackService.getQuestions(2).subscribe((section2) => this.questions2 = section2);
    this.feedbackService.getQuestions(3).subscribe((section3) => this.questions3 = section3);
 
   
  }
  getTrainings() {
    this.feedbackService.getTrainings().subscribe((details) => this.trainings = details);
  }



  ngOnInit() {
    
    this.getQuestions();
    this.getTrainings();
  }





}

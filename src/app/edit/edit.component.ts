
import { Component, OnInit } from '@angular/core';

import { FeedService } from '../feed.service';

import { FeedbackService } from '../feedback.service';



declare var jquery: any;



declare var $: any;

import { UserTable, QuestionAnswer, Question, ChoiceRange, QuestionOption, Survey, Training, User, SurveySection, OptionGroup } from '../classes';

import { isDate } from 'util';

@Component({

selector: 'app-edit',

templateUrl: './edit.component.html',

styleUrls: ['./edit.component.css']

})

export class EditComponent implements OnInit {

users: UserTable[];

constructor(public feedbackService: FeedbackService,private _feedservice: FeedService)

{ 

this.train = new Array<Training>();

this.training = new Training();

this.training1 = new Training();

}

getProducts() {

this._feedservice.getUsers()

.subscribe(res => this.users = res);

}

private editing:boolean = false;

ngOnInit() {

this.getTraining();

this.getProducts();

}





train :Training[];

public getTraining()

{

this.feedbackService.getTrainings().subscribe(

res=> this.train = res,

);

}

deleteID:number;

onSelectionChange(id:number)

{

debugger;
this.deleteID=id;
debugger;

this.feedbackService.deleteTrainers(this.deleteID).subscribe();

alert("record "+this.deleteID+" deleted");

window.location.reload();


}

training:Training;

training1:Training;



date2: string;

update()

{

    debugger;

this.training1.TrainingName=($("#Id1").val());

this.training1.Trainer = ($("#Id2").val());

this.training1.Date=($("#Id3").val());

var date1 = new Date(this.training1.Date);

debugger;

this.date2 = date1.toString();

debugger;

if (this.date2 == "Invalid Date")

{
    debugger;

this.training1.Date=this.training.Date;


}
debugger;

this.training1.Venue = ($("#Id4").val());
debugger;

this.feedbackService.editTraining(this.training1).subscribe();

this.editing = false;

alert("record updated");

window.location.reload();

}


EditFunction(id:number, pname:string, tname:string,date1:Date, venue:string)

{
    debugger;
this.editing = true;

this.training1.TrainingID=id;



this.training.TrainingName=pname;

this.training.Trainer = tname;

this.training.Venue=venue;

this.training.Date = new Date(date1);

debugger;





var input = $('<input type="text" class="form-control" id="Id1" value="' + this.training.TrainingName + '" />')



var input2 = $('<input type="datetime-local" class="form-control" id="Id3"/>')

var input3 = $('<input type="text" class="form-control" id="Id4" value="' + this.training.Venue + '" />')

$('.text-info1').text('').append(input);



$('.text-info3').text('').append(input2);

$('.text-info4').text('').append(input3);



$('#Id2').val(this.training.Trainer);









}


}
import { Component, OnInit } from '@angular/core';
import { UserTable, QuestionAnswer, Question, ChoiceRange, QuestionOption, Survey, Training, User, SurveySection, OptionGroup, Admin } from '../classes';
import { FeedService } from '../feed.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { isDate } from 'util';


declare var jquery: any;

declare var $: any;

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

export class FeedbackComponent implements OnInit {
  users: UserTable[];
  username: string;
  msg = "";

  filteredItems: UserTable[];
  inputName: string = '';
  selectedUser = "";
  ListUser: string[];

  constructor(private _feedservice: FeedService) {
    this.train = new Training();
    this.ListUser = new Array<string>();
    this.filteredItems = new Array<UserTable>();
  }
  getProducts() {
    this._feedservice.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit() {
    this.getProducts();
  }

  selectName() {
    this.train.Trainer = this.username;
  }

  public train: Training;
  check: any;
  date2: string;
  flag: boolean;
  flag1: boolean;

  public SubmitForm(pname: string, date: Date, venue: string) {

    this.check = ($("#Id").val());

    this.flag = /^[a-zA-Z]+$/.test(pname);

    this.flag1 = /^[a-zA-Z]+$/.test(venue);






    var date1 = new Date(date);


    this.date2 = date1.toString();

    if (pname == "") {

      this.msg = "please enter the program name";

      return;

    }

    if (this.date2 == "Invalid Date")

    // if(this.flag==false)

    {

      // debugger;

      this.msg = "please enter the date"

      return;

    }

    if (venue == "") {

      this.msg = "please enter the venue";

      return;

    }

    // this.flag=isDate(date1);

    // debugger;



    if (this.check == null) {

      // debugger;

      this.msg = "please enter the Trainer name";

      return;

    }

    if (pname.length >= 10 || venue.length >= 10) {

      this.msg = "less than 10 characters";

      return;

    }

    if (this.flag == false) {

      debugger;

      this.msg = "the program name should be a string with alpahabets";

      return;

    }

    if (this.flag1 == false) {

      debugger;

      this.msg = "the venue should be a string with alpahabets";

      return;
    }
    this.train.TrainingName = pname;
    this.train.Date = date;
    this.train.Venue = venue;
    this.train.Attendees = this.selectedUser;
    this._feedservice.InsertTraining(this.train).subscribe()
    window.location.reload();
  }
  FilterByName() {
    this.filteredItems = [];
    if (this.inputName != "") {
      this.users.forEach(element => {
        if (element.UserName.toUpperCase().indexOf(this.inputName.toUpperCase()) >= 0) {
          this.filteredItems.push(element);
        }
      });
    } else {
      this.filteredItems = this.users;
    }
    console.log(this.filteredItems);

  }

  onSelect(user: User) {
    for (var UserL of this.ListUser) {
      if (UserL == user.UserName)
        return;

    }

    this.ListUser.push(user.UserName);
    this.selectedUser = this.selectedUser + user.UserName + ",";

  }


}
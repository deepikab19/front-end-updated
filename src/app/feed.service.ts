import { Injectable } from '@angular/core';
import { QuestionAnswer, Question, ChoiceRange, QuestionOption, Survey, Training, User, SurveySection, OptionGroup, Admin } from './classes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions, RequestMethod, } from '@angular/http';

@Injectable()
export class FeedService {
  constructor(public _http: Http) { }
  public productUrl = "http://localhost:18134/api/Survey";

  getUsers() {
    return this._http.get(this.productUrl + "/GetAllUsers")
      .map(res =>
        <User[]>res.json())
      .catch(this.handleError);
  }

  InsertTraining(train: Training) {
    return this._http.post(this.productUrl + "/InsertTraining", train)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

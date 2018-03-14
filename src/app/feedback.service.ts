import { Injectable } from '@angular/core';
import { Question, ChoiceRange, QuestionOption, Survey, Training, User, Admin } from './classes';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class FeedbackService {
  public productUrl = "http://localhost:18134/api/Survey";
  constructor(private _http: Http) { }

  public getQuestions(id: number) {
    return this._http.get(this.productUrl + "/GetQuestions/" + id)
      .map(res => { return res.json(); })
      .catch((error: any) => { return error; });
  }
 
  public getTrainings() {
    return this._http.get(this.productUrl + "/GetTraining")
      .map(res => { return res.json(); })
      .catch((error: any) => { return error; });
  }

  public submitAnswer(survey) {
    return this._http.post(this.productUrl + "/InsertSurvey", survey)
      .catch((error: any) => { return error; });
  }

  public getAnswers(id) {
    return this._http.get("http://localhost:18134/api/Survey/GetFeedback/" + id)
      .map(res => { return res.json(); })
      .catch((error: any) => { return error; });
  }

  editTraining(train: Training) {
    return this._http.put("http://localhost:18134/api/Survey/Edittraining/" + train.TrainingID, train)
      .catch((error: any) => { return error; });
  }

  deleteTrainers(id: number) {
    return this._http.delete("http://localhost:18134/api/Survey/DeleteTraining/" + id)
      .catch((error: any) => { return error; });
  }
  public admin() {
    return this._http.get(this.productUrl + "/GetAdmin")
      .map(res => { return res.json(); })
      .catch((error: any) => { return error; });
  }
}

import { Time } from "@angular/common";

export class Question {
    QuestionID: number;
    SectionID: number;
    Description: string;
    OptionGroupID: number;
}

export class ChoiceRange {
    OptionChoiceID
    OptionGroupID: number;
    Name: string;
}

export class QuestionOption {
    QuestionOptionID: number;
    QuestionID: number;
    OptionGroupID: number;
}

export class Survey {
    SurveyID: number;
    Answers: string;
    QuestionID: number;
    TrainingID: number;
}

export class Training {
    TrainingID: number;
    TrainingName: string;
    Trainer: string;
    Date: Date;
    Venue: string;
    Attendees: string;
}

export class User {
    UserID: number;
    UserName: string;
}

export class OptionGroup {
    OptionGroupID: number;
    Name: string;
}

export class SurveySection {
    SurveySectionID: number;
    Name: string;
    SubHeading: string;
}

export class QuestionAnswer {
    QuestionId: number;
    Answer: string;
}

export class UserTable {
    UserId: number;
    UserName: string;
}

export class Admin {
    UserName: string;
    Password: string;
}
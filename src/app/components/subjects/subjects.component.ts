import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map, Observable, Subject } from 'rxjs';
import { inject } from '@angular/core/testing';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],

})
export class SubjectsComponent implements OnInit {
  firstFormGroup!: FormGroup
  secondFormGroup!: FormGroup
  isEditable = true;
  questions: any[] = [];
  subjectName: string = "";
  isLinear = true;
  subjectId: any;
  deleteBoolean: any;
  correctNum:any;
  stepperOrientation:any;
  constructor(private _formBuilder: FormBuilder, private toastr: ToastrService, private serv: AuthenticationService,breakpointObserver:BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      answer1: ['', [Validators.required]],
      answer2: ['', [Validators.required]],
      answer3: ['', [Validators.required]],
      answer4: ['', [Validators.required]],
      correctAnswer: ['']
    });
    this.isEditable = true;

  }

  ngOnInit(): void {
  }

  onStart() {
    console.log(this.firstFormGroup.value.firstCtrl);
    this.subjectName = this.firstFormGroup.value.firstCtrl;
    this.isLinear = false;

  }

  onSelect(event: any) {
    this.correctNum = event.value;
    console.log(this.correctNum);
  }
  pushQuestion() {
   
    let model = {

      
      question: this.secondFormGroup.value.secondCtrl,
      answer1: this.secondFormGroup.value.answer1,
      answer2: this.secondFormGroup.value.answer2,
      answer3: this.secondFormGroup.value.answer3,
      answer4: this.secondFormGroup.value.answer4,
      correctAnswer: this.secondFormGroup.value[this.correctNum]
    }

    let answers = [this.secondFormGroup.value.answer1, this.secondFormGroup.value.answer2, this.secondFormGroup.value.answer3, this.secondFormGroup.value.answer4]

    if (!this.secondFormGroup.value.correctAnswer) {
      this.toastr.error("يرجى تحديد الاجابة الصحيحة", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    }
    else {
      let hasDuplicate = new Set(answers).size !== answers.length;
      if (hasDuplicate) {
        this.toastr.error("لا يمكن تكرار الاجابات ", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
      } else {
        this.toastr.success("Question added successfully", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
        this.questions.push(model);
        this.secondFormGroup.reset();
        console.log(this.questions);
      }
    }

  }
  clear() {
    this.secondFormGroup.reset();

  }
  onSubmit() {

    let model = {
      subjectName: this.subjectName,
      questions: this.questions
    }
    this.serv.createQuestiom(model).subscribe((data: any) => {
      this.subjectId = data.id


    })
  }

  // start from here there is a problem 
  //i need to delete a question from the array and data base both
  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
    console.log(this.questions);

    let model = {
      subjectName: this.subjectName,
      questions: this.questions
    }
    this.serv.deleteQuestionFormApi(this.subjectId, model).subscribe((data: any) => {
    })
  }

  deleteTest() {



    this.questions = [];
    this.serv.deleteTest(this.subjectId).subscribe((data: any) => {

    })

  }

}









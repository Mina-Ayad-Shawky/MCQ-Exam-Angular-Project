import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  subjectName: any;
  subjectQuestions: any[] = []
  userRole: any;
  studentAnswer: any;
  index: any;
  total: number = 0;
  res: boolean = false;
  //////////////////////////////////////////
  loggedInUserId: any;
  getLoggedPerson: any;
  studentSubjects: any[] = [];
  isTaken: boolean = false;
  degree: any;
  constructor(private activeRoute: ActivatedRoute, private serv: AuthenticationService, private router: Router, private toastr: ToastrService) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.serv.getEachSubject(this.id).subscribe((data: any) => {
      this.subject = data;
      this.subjectName = data.subjectName;
      this.subjectQuestions = data.questions;

      // console.log(this.subjectQuestions);
    })



  }

  ngOnInit(): void {
    this.getLoginData()
    // this.getPersonObject()

  }
  getLoginData() {
    this.serv.getLoginData().subscribe((data: any) => {
      this.userRole = data.role;
      this.loggedInUserId = data.userId;
      // console.log(this.loggedInUserId);
      this.getPersonObject()
    })
  }

  getPersonObject() {
    this.serv.getOneUser(this.loggedInUserId).subscribe((data: any) => {
      this.getLoggedPerson = data
      console.log(this.getLoggedPerson);
      
      this.studentSubjects = data?.subjects ? data.subjects : [];
      this.total=this.getLoggedPerson?.subjects?.find((item: any) => item.subjectId == this.id)?.degree;
      console.log(this.degree);
      
      this.checkIfTaken()
      // console.log(this.getLoggedPerson);
    })
  }
  //check if taken before
  checkIfTaken() {
    this.isTaken = false;
    let index = this.getLoggedPerson?.subjects.findIndex((item: any) => item.subjectId == this.id)
    if (index != -1) {
      this.isTaken = true
      // console.log(this.isTaken);

    }
  }



  updateUserInfo() {
    this.studentSubjects.push({
      subName: this.subjectName,
      degree: this.total,
      subjectId: this.id
    })
    let model = {
      name: this.getLoggedPerson.name,
      email: this.getLoggedPerson.email,
      password: this.getLoggedPerson.password,
      subjects: this.studentSubjects
    }
    this.serv.editOnUsers(this.loggedInUserId, model).subscribe((data: any) => {
    })
  }
  // check if the student got the test before




  deleteExam() {
    this.serv.deleteTest(this.id).subscribe((data: any) => {
      window.location.replace('/sharedSubjects')
      // this.router.navigateByUrl('/sharedSubjects')
      this.toastr.success('تم حذف الامتحان بنجاح')
    })
  }
  studentAnswerMethod(answer: any, i: number) {
    this.studentAnswer = answer;
    this.index = i;
    this.subjectQuestions[i].studentAnswer = answer
    console.log(this.subjectQuestions);
    // console.log(this.studentAnswer,this.index);
  }
  checkResult() {
    this.res = true;
    this.total = 0;
    for (let i = 0; i < this.subjectQuestions.length; i++) {
      if (this.subjectQuestions[i].correctAnswer == this.subjectQuestions[i].studentAnswer) {
        this.total++

      }
    }
    this.updateUserInfo()

  }
}

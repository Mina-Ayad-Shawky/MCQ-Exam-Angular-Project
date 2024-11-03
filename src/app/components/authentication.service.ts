import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users = new Subject();
  delete = new Subject();
  constructor(private http: HttpClient) { }
  createNewEmail(model: any) {
    return this.http.post('http://localhost:3000/students', model)
  }
  getAllEmails() {
    return this.http.get('http://localhost:3000/students');
  }

  getUsers(type: string) {
    return this.http.get('http://localhost:3000/' + type)
  }

  login(model: any) {
    return this.http.put('http://localhost:3000/login/1', model)
  }

  getLoginData() {
    return this.http.get('http://localhost:3000/login/1')
  }
  createQuestiom(model: any) {
    return this.http.post('http://localhost:3000/questions', model)
  }
  getAllQuestions() {
    return this.http.get('http://localhost:3000/questions')
  }

  deleteQuestionFormApi(id: number, model: any) {
    return this.http.put('http://localhost:3000/questions/' + id, model)
  }
  deleteTest(id: number) {
    return this.http.delete('http://localhost:3000/questions/' + id)
  }
  getEachSubject(id:number){
    return this.http.get('http://localhost:3000/questions/'+id)
  }

  getOneUser(id:number) {
    return this.http.get('http://localhost:3000/students/'+id);
  }
  editOnUsers(id:number,model:any){
    return this.http.put('http://localhost:3000/students/'+id,model)
  }
}

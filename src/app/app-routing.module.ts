import { SubjectsSharedComponent } from './components/subjects-shared/subjects-shared.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { ExamComponent } from './components/exam/exam.component';
import { StudentsComponent } from './components/students/students.component';

const routes: Routes = [
  {path:'logIn',component:LogInComponent},
  {path:'register',component:RegisterComponent},
  {path:'subjects',component:SubjectsComponent},
  {path:'sharedSubjects',component:SubjectsSharedComponent},
  {path:'exam/:id',component:ExamComponent},
  {path:'students',component:StudentsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

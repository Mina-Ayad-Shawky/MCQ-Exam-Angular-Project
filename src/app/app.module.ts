import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './components/subjects/subjects.component';


//ANGULAR MATERIAL IMPORTS
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import { BidiModule } from '@angular/cdk/bidi';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { SubjectsSharedComponent } from './components/subjects-shared/subjects-shared.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/AngulatMat/dialog/dialog.component';
import { ExamComponent } from './components/exam/exam.component';
import { StudentsComponent } from './components/students/students.component';
import {MatTableModule} from '@angular/material/table';

//















@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogInComponent,
    RegisterComponent,
    SubjectsComponent,
    SubjectsSharedComponent,
    DialogComponent,
    ExamComponent,
    StudentsComponent,
  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatStepperModule,
    BidiModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

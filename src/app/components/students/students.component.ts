import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../authentication.service';

export interface StudentData {
  name: string;
  subject: string;
  degree: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'subject', 'degree'];
  dataSource = new MatTableDataSource<StudentData>(); // Initialize as MatTableDataSource

  constructor(private serv: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.serv.getAllEmails().subscribe((data: any) => {
      // Flatten the data structure and prepare for the table
      const tableData = data?.flatMap((student: any) => {
        if (student?.subjects) {
          return student.subjects.map((subject: any) => ({
            name: student.name,
            subject: subject.subName,
            degree: subject.degree
          }));
        } else {
          return [{
            name: student.name,
            subject: "-",
            degree: "-"
          }];
        }
      }) || []; // Provide default empty array if data is null or undefined
  
      // Assign the processed array to dataSource.data
      this.dataSource.data = tableData;
      console.log(this.dataSource.data);
    });
  }
  
}

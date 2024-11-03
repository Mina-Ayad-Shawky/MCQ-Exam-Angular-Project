import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../AngulatMat/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects-shared',
  templateUrl: './subjects-shared.component.html',
  styleUrls: ['./subjects-shared.component.css']
})
export class SubjectsSharedComponent implements OnInit {
  user: any;
  allSubjects: any[] = [];

  constructor(private serv: AuthenticationService, public dialog: MatDialog,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.serv.users.subscribe((data: any) => {
      if (data.role) {
        this.user = data.role;
      }
      this.serv.getAllQuestions().subscribe((data: any) => {
        this.allSubjects = data;
      });
    });
  }

  openDialog(i: number, id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {  // Check if the user confirmed the deletion
        this.deleteTest(i, id);
      }
    });
  }

  deleteTest(i: number, id: number): void {
    this.allSubjects.splice(i, 1);
    this.serv.deleteTest(id).subscribe(
      (data: any) => {
        this.toastr.success('تم حذف الاختبار بنجاح')
      },
      (error) => {
        this.toastr.success('حدث خطأ اثناء حذف الاختبار')

      }
    );
  }
}

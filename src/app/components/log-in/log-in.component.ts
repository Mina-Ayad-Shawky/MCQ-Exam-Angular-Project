import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {


  loginForm!: FormGroup;
  type: any;
  users: any[] = [];
  constructor(private fb: FormBuilder, private serv: AuthenticationService, private toastr: ToastrService, private route: Router, private activeRoute: ActivatedRoute) {
    this.loginForm = this.fb.group({
      role: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.serv.getUsers('students').subscribe((data: any) => {
      this.users = data;
    })
  }
  ngOnInit(): void {
  }
  changeRole(event: any) {
    this.type = event.target.value;
    // console.log(event.target.value)
    this.serv.getUsers(this.type).subscribe((data: any) => {
      this.users = data;
      console.log(this.users);

    })
  }

  onSubmit() {
    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.password == this.loginForm.value.password);
    if (index == -1) {
      this.toastr.error("Wrong email or password", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    } else {
      let model = {
        userName: this.users[index].name,
        role: this.type,
        userId:this.users[index].id,
      }
      this.serv.login(model).subscribe((data: any) => {
        this.serv.users.next(data);
        console.log(data);
        

      })
      this.toastr.success("Log in successfully", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
      this.route.navigateByUrl('/sharedSubjects')
    }
  }


  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup
  allEmails: any[] = [];
  id:any;
  constructor(private build: FormBuilder, private serv: AuthenticationService, private toastr: ToastrService, private route: Router) {

    this.myForm = this.build.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    })


    this.serv.getAllEmails().subscribe((data: any) => {
      this.allEmails = data;
    })
  }
  ngOnInit(): void {
  }
  onSubmit() {
    let model = {
      name: this.myForm.value.name,
      email: this.myForm.value.email,
      password: this.myForm.value.password
    }

    let index = this.allEmails.findIndex(item => item.email == model.email);
    if (index == -1) {
      this.serv.createNewEmail(model).subscribe((data: any) => {
       this.id=data.id;
        this.toastr.success("Registered successfully", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        }
        );

        let mode = {
          userName: model.name,
          role: 'students',
          userId:this.id,
        }
        this.serv.login(mode).subscribe((data: any) => {
          this.serv.users.next(data);
  
          console.log(data);
        })

      })
      
      
      

      this.route.navigateByUrl('/sharedSubjects')
    } else {
      this.toastr.error("Email already exist", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    }

    // this.myForm.reset()
  }
}

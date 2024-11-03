import { Component } from '@angular/core';
import { AuthenticationService } from './components/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'McqSite';
  constructor(private serv: AuthenticationService ,private router:Router) {
  //  this.router.navigateByUrl('/subjects')
    this.serv.getLoginData().subscribe((data:any)=>{
      this.serv.users.next(data);
    })
  }
}

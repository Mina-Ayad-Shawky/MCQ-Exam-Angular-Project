import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/components/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  users: any = null;
  constructor(private serv: AuthenticationService) {
    this.serv.users.subscribe((data: any) => {
      if(data.role){
        this.users = data;
      }
      // console.log(this.users);

    })
  }

  ngOnInit(): void {
  }
  logout() {//problem hereeeee
    let model = {};
    this.serv.login(model).subscribe((data: any) => {
      this.serv.users.next(data);
      this.users = null;

    })
  }
}

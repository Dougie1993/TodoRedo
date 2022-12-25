import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Login } from 'src/app/interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials : Login = {
    email : '',
    password : ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin (email: string, password: string) {
    console.log(email);
    if(email) {
      this.credentials.email = email;
    }
    if (password) {
      this.credentials.password = password
    }
    if (this.credentials) {
      this.auth.login(this.credentials).subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });
    }

  }
}

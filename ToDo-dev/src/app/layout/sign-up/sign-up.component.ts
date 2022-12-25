import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Login } from 'src/app/interface/login.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  credentials : Login = {
    email : '',
    password: ''
  }
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSignUp (email: string, password: string) {
    console.log(email);
    if(email) {
      this.credentials.email = email;
    }
    if (password) {
      this.credentials.password = password
    }
    if (this.credentials) {
      this.auth.signUp(this.credentials).subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });
    }

  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private userService: UserService,
              private localStorage: LocalStorageService,
              private _router: Router) {
  }

  ngOnInit() {
    this.autoLogin();
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully logged in');
        this.saveLoginInfo();
        this.message = res.msg;
        this._router.navigate(['product', 'list']);
      }, (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      });
  }

  autoLogin() {
    this.username = this.localStorage.getItem('username');
    this.password = this.localStorage.getItem('password');
    if (this.username != null && this.password != null) {
      this.login();
      console.log(`Auto login, username: ${this.username}, password: ${this.password}`);
    }
  }

  saveLoginInfo() {
    this.localStorage.setItem('username', this.username);
    this.localStorage.setItem('password', this.password);
  }

}

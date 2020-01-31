import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor(private userService: UserService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully logged in');
        this.message = res.msg;
        this._router.navigate(['login']);
      }, (err) => {
        console.error('Error logging in', err);
        this.message = err.error.msg;
      });
  }

}

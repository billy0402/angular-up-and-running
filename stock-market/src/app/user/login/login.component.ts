import {Component, OnInit} from '@angular/core';

import {UserService} from '../../services/user.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(private userService: UserService,
              public messageService: MessageService) {
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully logged in');
        this.messageService.message = res.msg;
      }, (err) => {
        console.error('Error logging in', err);
        this.messageService.message = err.error.msg;
      });
  }

}

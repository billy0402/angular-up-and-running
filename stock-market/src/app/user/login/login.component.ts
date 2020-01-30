import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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

  // 將 Router 注入元件
  constructor(private userService: UserService,
              public messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully logged in');
        this.messageService.message = res.msg;
        // 使用 Router 導向某個路徑 (絕對路徑)
        this.router.navigate(['stock', 'list']);
      }, (err) => {
        console.error('Error logging in', err);
        this.messageService.message = err.error.msg;
      });
  }

}

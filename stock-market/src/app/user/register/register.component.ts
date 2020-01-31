import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  // 將 Router 注入元件
  constructor(private userService: UserService,
              public messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully registered');
        this.messageService.message = res.msg;
        // 使用 Router 導向某個路徑 (絕對路徑)
        this.router.navigate(['user', 'login']);
      }, (err) => {
        console.error('Error registering', err);
        this.messageService.message = err.error.msg;
      });
  }

}

import {Component, OnInit} from '@angular/core';

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

  constructor(private userService: UserService,
              public messageService: MessageService) {
  }

  ngOnInit() {
  }

  register() {
    this.userService.register(this.username, this.password)
      .subscribe((res) => {
        console.log('Successfully registered');
        this.messageService.message = res.msg;
      }, (err) => {
        console.error('Error registering', err);
        this.messageService.message = err.error.msg;
      });
  }

}

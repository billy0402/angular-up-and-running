import {Component, OnInit} from '@angular/core';

import {MessageService} from './services/message.service';

@Component({
  // 此 DOM 的 CSS 選擇器會被轉譯成此元件的一個實例
  selector: 'app-root',
  // 此元件專屬的 HTML 模板
  templateUrl: './app.component.html',
  // 此元件專屬的樣式表
  styleUrls: ['./app.component.css']
})
// 元件類別與成員和函式
export class AppComponent implements OnInit {

  title = 'stock-market';

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.message = 'Hello Message Service!';
  }

}

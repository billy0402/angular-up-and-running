import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  // 此 DOM 的 CSS 選擇器會被轉譯成此元件的一個實例
  selector: 'app-root',
  // 此元件專屬的 HTML 模板
  templateUrl: './app.component.html',
  // 此元件專屬的樣式表
  styleUrls: ['./app.component.css'],
  // 樣式封裝
  encapsulation: ViewEncapsulation.None,
  /*
  ViewEncapsulation.Emulated: 預設值，會建構 CSS 來模擬 DOM 與根樣式
  ViewEncapsulation.Native:   建議用，會模擬根，需要瀏覽器與平台有原生支援
  ViewEncapsulation.None:     使用全域 CSS，沒有任何封裝，是套用通用樣式的好方法
   */
  // 截掉模板中多餘的空白，有效降低 HTML 的大小，預設為 false
  preserveWhitespaces: true,
  // 內插記號，預設為 ['{{', '}}']，避免與其他框架或技術衝突
  interpolation: ['<<', '>>'],
  // 手動更新 UI，預設為 ChangeDetectionStrategy.Default
  changeDetection: ChangeDetectionStrategy.OnPush
})
// 元件類別與成員和函式
export class AppComponent {
  title = 'stock-market';
}

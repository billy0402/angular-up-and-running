// karma.conf.js 需要這個檔案並載入所有 .spec 與框架檔案

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// 首先將 Angular 測試環境初始化
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// 然後找出所有測試
const context = require.context('./', true, /\.spec\.ts$/);
// 載入模組
context.keys().map(context);

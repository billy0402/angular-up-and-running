# [angular-up-and-running](https://github.com/shyamseshadri/angular-up-and-running)

## environment

- [macOS 10.15.2](https://www.apple.com/tw/macos/catalina/)
- [WebStorm 2019.3.1](https://www.jetbrains.com/webstorm/)
- nvm 0.35.2, node 12.14.0, npm 6.13.4
- Angular CLI 8.3.23

## [Angular CLI](https://cli.angular.io)
```shell
$ npm install -g @angular/cli

$ ng --version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 8.3.23
Node: 12.14.0
OS: darwin x64
Angular: 
... 

Package                      Version
------------------------------------------------------
@angular-devkit/architect    0.803.23
@angular-devkit/core         8.3.23
@angular-devkit/schematics   8.3.23
@schematics/angular          8.3.23
@schematics/update           0.803.23
rxjs                         6.4.0
    
$ ng help
```

## command
```shell
# 建構新專案
$ ng new <project name>

# 使用 CSS.SCSS 或其他 CSS 框架
$ ng new <project name> --style=css

# 產生導向模組
$ ng new <project name> --routing

# 元件是否需要前綴
$ ng new <project name> --prefix=acme

# 執行應用程式，環境設定檔為 environment.ts
$ ng serve

# 執行應用程式，環境設定檔為 environment.prod.ts
$ ng serve --prod

# 建構新元件
$ ng generate component <component name>

# 產生類別骨架
$ ng generate class <class name>

# 產生服務骨架
$ ng generate service <service name>

# 建構路由模組並連結至 AppModule
$ ng generate module app-routing --flat --module=app

# 產生路由模組
$ ng generate module <module name> --routing

# 建構路徑保護
$ ng generate guard <guard name>

# 執行測試
$ ng test

# 產生上線的檔案至 dist 目錄，單純建置
$ ng build

# 上線建置
# 移除空白.醜化程式碼.AOT(Ahead-of-Time).以上線模式執行Angular.死程式消除
$ ng build --prod --base-href=/app/

# 修改基底路徑 (index.html 的 <base href="/"> 標籤)
$ ng build --base-href=/app/
```

## project tree
```
<project name>
├── e2e
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts         # 根元件
│   │   └── app.module.ts            # 主要模組
│   ├── assets
│   ├── environments
│   ├── index.html                   # 根 HTML
│   ├── main.ts                      # 進入點
└── angular.json                     # Angular CLI 組態
```

## lifecycle hooks
```
constructor

ngOnChanges
ngOnInit
ngDoCheck
    ngAfterContentInit
    ngAfterContentChecked
    ngAfterViewInit
    ngAfterViewChecked
ngOnDestroy
```

## [Angular Universal](https://github.com/angular/angular-cli/wiki/stories-universal-rendering)
```shell
# 建置 Angular Universal 應用程式
$ ng run build:universal

# 執行 Angular Universal 應用程式
$ ng run serve:universal
```
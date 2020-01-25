# [angular-up-and-running](https://github.com/shyamseshadri/angular-up-and-running)

## environment

- [macOS 10.15.2](https://www.apple.com/tw/macos/catalina/)
- [WebStorm](https://www.jetbrains.com/webstorm/)
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

# 執行應用程式
$ ng serve

# 建構新元件
$ ng generate component <component name>

# 產生類別骨架
$ ng generate class <class name>

# 執行測試
$ ng test
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

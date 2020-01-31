import {NgModule} from "@angular/core";
import {AppModule} from "./app.module";
import {ServerModule} from "@angular/platform-server";
import {ModuleMapLoaderModule} from "@nguniversal/module-map-ngfactory-loader";
import {APP_BASE_HREF} from "@angular/common";
import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    // 處理懶載入路徑
    ModuleMapLoaderModule
  ],
  providers: [
    // 僅用於 Universal
    {provide: APP_BASE_HREF, useValue: 'http://localhost:4000/'}
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}

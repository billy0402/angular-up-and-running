// 重要且要在其他程式之前
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

import * as express from 'express';
import {join} from 'path';

import * as proxy from 'http-proxy-middleware';


// 快速伺服器繪製與 Prod 模式 (dev 模式不需要)
enableProdMode();

// 精簡伺服器
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// 注意: 保持 require()，因為這個檔案是從 webpack 動態建立的
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main.bundle');

// 精簡引擎
import {ngExpressEngine} from '@nguniversal/express-engine';
// 匯入懶載入引擎的模組 map
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.use('/api', proxy({
  target: 'http://localhost:3000',
  changeOrigin: true
}));

// 在 /browser 的伺服器靜態檔案
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// 一般路徑使用 Universal 引擎
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {req});
});

// 啟動 Node 伺服器
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});

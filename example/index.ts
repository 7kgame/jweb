import { Application, AppErrorEvent } from '../lib';

import * as Path from 'path';

const viewDir = Path.join(Path.dirname(Path.dirname(__dirname)), 'example', 'view');
console.log(viewDir, '===');

Application.create({
    assets: __dirname + Path.sep + 'assets',
    port: 8080,
    host: 'localhost',
    propertyNS: 'node-web',
    viewDir: viewDir
  })
  .start(__dirname)
  .then(application => { // test event
    application.on(AppErrorEvent.REQUEST, err => {
      console.error('app error: ', err);
    });
  });

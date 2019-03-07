import { Application, AppErrorEvent } from '../lib';

import * as Path from 'path';

Application.create({
    assets: __dirname + Path.sep + 'assets',
    port: 8080,
    host: 'localhost',
    propertyNS: 'node-web',
  })
  .start(__dirname)
  .then(application => { // test event
    application.on(AppErrorEvent.REQUEST, err => {
      console.error('app error: ', err);
    });
  });

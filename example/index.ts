import { Application, AppErrorEvent } from '../lib';

import * as Path from 'path';

Application.create()
  .options({
    resource: __dirname + Path.sep + 'public',
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

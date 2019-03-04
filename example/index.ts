import { Application } from '../lib';

import * as Path from 'path';

Application.create()
  .options({
    resource: __dirname + Path.sep + 'public',
    port: 8080,
    host: 'localhost',
    propertyNS: 'node-web',
  })
  .start(__dirname);

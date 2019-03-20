"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const Path = require("path");
const viewDir = Path.join(Path.dirname(Path.dirname(__dirname)), 'example', 'view');
lib_1.Application.create({
    assets: __dirname + Path.sep + 'assets',
    port: 8080,
    host: 'localhost',
    propertyNS: 'node-web',
    viewDir: viewDir
})
    .start(__dirname)
    .then(application => {
    application.on(lib_1.AppErrorEvent.REQUEST, err => {
        console.error('app error: ', err);
    });
});

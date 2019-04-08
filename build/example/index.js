"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const Path = require("path");
const viewDir = Path.join(Path.dirname(Path.dirname(__dirname)), 'example', 'view');
let App = class App {
    static main(configs) {
        console.log('-----', configs);
    }
};
App = __decorate([
    jbean_1.JBootApplication
], App);
// Application.create({
//     assets: __dirname + Path.sep + 'assets',
//     port: 8080,
//     host: 'localhost',
//     propertyNS: 'node-web',
//     viewDir: viewDir
//   })
//   .start(__dirname)
//   .then(application => { // test event
//     application.on(AppErrorEvent.REQUEST, err => {
//       console.error('app error: ', err)
//     })
//   })

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const jbean_1 = require("jbean");
let App = class App {
    static main(configs) {
        lib_1.Application.start()
            .then(application => {
            application.on(lib_1.AppErrorEvent.REQUEST, err => {
                // console.error('app error: ', err)
            });
        });
    }
};
App = __decorate([
    jbean_1.JBootApplication
], App);

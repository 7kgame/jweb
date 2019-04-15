"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
exports.Controller = controller_1.Controller;
exports.Get = controller_1.Get;
exports.Post = controller_1.Post;
exports.Put = controller_1.Put;
exports.Patch = controller_1.Patch;
exports.Options = controller_1.Options;
// import { All, Get, Post, Put, Patch, Options } from './methods'
// import Autowired from './autowired'
// import Service from './service'
// import Repository from './repository'
// import Middleware from './middleware'
const response_1 = require("./response");
exports.ResponseXML = response_1.ResponseXML;
exports.ResponseJSON = response_1.ResponseJSON;

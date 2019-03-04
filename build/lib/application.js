"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const Hapi = require("hapi");
const Inert = require("inert");
const Hoek = require("hoek");
const bean_1 = require("./bean");
const prestart_1 = require("./prestart");
const defaultOptions = {
    port: 3000,
    host: 'localhost',
    configNS: 'node-web',
    controllerDir: 'controller',
    viewDir: 'view',
    tplExt: 'html'
};
class Application {
    constructor() {
        this.appOptions = {};
        this.properties = {};
    }
    static create() {
        const ins = Application.ins = new Application();
        ins.appOptions = Hoek.applyToDefaults(defaultOptions, ins.appOptions);
        return ins;
    }
    static getIns() {
        return Application.ins;
    }
    options(options) {
        Hoek.merge(this.appOptions, options, false, true);
        return this;
    }
    init(root) {
        if (!root) {
            console.log('root path is required!');
            process.exit();
        }
        this.root = root;
        if (typeof this.appOptions.resource === 'undefined') {
            this.appOptions.resource = Path.dirname(root) + Path.sep + 'public';
        }
        this.resource = this.appOptions.resource;
        this.configNS = this.appOptions.configNS;
        this.controllerDir = this.appOptions.controllerDir;
        this.viewDir = this.appOptions.viewDir;
        this.tplExt = this.appOptions.tplExt;
        this.server = new Hapi.Server({
            port: this.appOptions.port,
            host: this.appOptions.host
        });
    }
    start(root) {
        return __awaiter(this, void 0, void 0, function* () {
            this.init(root);
            prestart_1.default(this);
            let dirs = this.appOptions.componentDirs || [this.root];
            yield bean_1.default.scan(dirs);
            yield this.server.register(Inert);
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
            this.registerExit();
        });
    }
    route(option) {
        this.server.route(option);
    }
    addProperty(property) {
        Hoek.merge(this.properties, property, false, true);
    }
    registerExit() {
        let exitHandler = function (options, code) {
            if (options && options.exit) {
                console.log('application exit at', code);
                bean_1.default.destroy();
                process.exit();
            }
            else {
                console.log('exception', code);
            }
        };
        process.on('exit', exitHandler.bind(this, { exit: true }));
        // catch ctrl+c event
        process.on('SIGINT', exitHandler.bind(this, { exit: true }));
        // catch "kill pid"
        process.on('SIGUSR1', exitHandler.bind(this, { exit: true }));
        process.on('SIGUSR2', exitHandler.bind(this, { exit: true }));
        // catch uncaught exceptions
        process.on('uncaughtException', exitHandler.bind(this, { exit: false }));
    }
}
exports.default = Application;

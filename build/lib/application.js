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
const YAML = require("yaml");
const events_1 = require("events");
const jbean_1 = require("jbean");
const starters_1 = require("./starters");
const defaultOptions = {
    port: 3000,
    host: 'localhost',
    configNS: 'node-web',
    controllerDir: 'controller',
    viewDir: 'view',
    tplExt: 'html'
};
var AppErrorEvent;
(function (AppErrorEvent) {
    AppErrorEvent["REQUEST"] = "error_request";
})(AppErrorEvent = exports.AppErrorEvent || (exports.AppErrorEvent = {}));
jbean_1.registerConfigParser('yml', function (content) {
    if (!content) {
        return null;
    }
    return YAML.parse(content);
});
class Application extends events_1.EventEmitter {
    constructor() {
        super();
        this.isDev = process.env.NODE_ENV === 'development';
        this.appOptions = {};
        this.properties = {};
        this.applicationConfigs = {};
    }
    static create(options) {
        const ins = Application.ins = new Application();
        ins.appOptions = Hoek.applyToDefaults(defaultOptions, options || {});
        ins.configNS = ins.appOptions.configNS;
        ins.applicationConfigs = jbean_1.getApplicationConfigs();
        return ins;
    }
    static getIns() {
        return Application.ins;
    }
    init() {
        this.root = Path.dirname(require.main.filename);
        const appConfigs = this.applicationConfigs[this.configNS].app;
        this.bindEvent();
        this.isWebApp = true;
        if (this.isWebApp) {
            this.server = new Hapi.Server({
                port: appConfigs.port || defaultOptions.port,
                host: appConfigs.host || defaultOptions.host,
                state: {
                    strictHeader: false
                }
            });
            if (typeof appConfigs.assets !== 'undefined') {
                this.assets = appConfigs.assets;
                if (!Path.isAbsolute(this.assets)) {
                    this.assets = Path.join(Path.dirname(this.root), this.assets);
                }
            }
            this.controllerDir = appConfigs.controllerDir || defaultOptions.controllerDir;
            if (process.env.NODE_ENV === 'development') {
                this.viewDir = Path.join(Path.dirname(Path.dirname(this.root)), 'src', appConfigs.viewDir || defaultOptions.viewDir);
            }
            else {
                this.viewDir = appConfigs.viewDir || defaultOptions.viewDir;
            }
            this.tplExt = appConfigs.tplExt || defaultOptions.tplExt;
        }
    }
    bindEvent() {
        this.on(AppErrorEvent.REQUEST, err => {
            console.error("Request error: ", err);
        });
    }
    runWebServer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.register(Inert);
            if (this.assets) {
                this.route({
                    method: 'GET',
                    path: '/{param*}',
                    handler: {
                        directory: {
                            path: this.assets,
                            redirectToSlash: false,
                            index: true,
                        }
                    }
                });
            }
            yield this.server.start();
            console.log(`Server running at: ${this.server.info.uri}`);
        });
    }
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            jbean_1.BeanFactory.initBean();
            const application = Application.create();
            application.init();
            jbean_1.BeanFactory.startBean();
            yield starters_1.default(application);
            if (application.isWebApp) {
                yield application.runWebServer();
            }
            else {
            }
            application.registerExit();
            return application;
        });
    }
    route(option) {
        option.options = { cors: true };
        this.server.route(option);
        return this;
    }
    addProperty(property) {
        Hoek.merge(this.properties, property, false, true);
        return this;
    }
    registerExit() {
        let exitHandler = function (options, code) {
            if (options && options.exit) {
                console.log('application exit at', code);
                jbean_1.BeanFactory.destroyBean();
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

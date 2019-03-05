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
const Hoek = require("hoek");
const Util = require("util");
const index_1 = require("./index");
const middleware_1 = require("./middleware");
const application_1 = require("../application");
const application_2 = require("../application");
const base_1 = require("../base");
const middleware_2 = require("../middleware");
const URL_PATH_TRIM = /^\/*|\/*$/g;
class Controller {
    static init() {
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
            const application = application_1.default.getIns();
            Controller.container.forEach(controllerMetas => {
                let controllerPath = controllerMetas.controller.path.replace(URL_PATH_TRIM, '');
                if (controllerPath) {
                    controllerPath = '/' + controllerPath + '/';
                }
                let controllerMiddlewares = controllerMetas.controller.middlewares;
                const controllerCls = controllerMetas.controller.target;
                Object.keys(controllerMetas.methods).forEach(method => {
                    let { requestMethod, path, handler, middlewares } = controllerMetas.methods[method];
                    path = controllerPath + path.replace(URL_PATH_TRIM, '');
                    let requestHandler = (request, h) => __awaiter(this, void 0, void 0, function* () {
                        if (request.method === 'options') {
                            return '';
                        }
                        return new Promise((resolve, reject) => {
                            let req = new base_1.Request(request, h, resolve, reject), res = new base_1.Response(request, h, resolve, reject);
                            if (!controllerMetas.ins) {
                                controllerMetas.ins = new controllerCls();
                                Controller.addMVCProperty(controllerMetas.ins, controllerMetas);
                            }
                            controllerMetas.ins.__method = handler.toLowerCase();
                            let allMiddlewares = [];
                            let responseMiddleware = middleware_2.default(controllerMetas.responseFormat.method[handler] || controllerMetas.responseFormat.clz);
                            if (responseMiddleware) {
                                allMiddlewares.push(responseMiddleware);
                            }
                            allMiddlewares = allMiddlewares.concat(controllerMiddlewares || []);
                            allMiddlewares = allMiddlewares.concat(middlewares || []);
                            let mlen = allMiddlewares.length, reqCallIdx = -1, resCallIdx = mlen;
                            let responseCallStack = function () {
                                if (resCallIdx > 0) {
                                    resCallIdx--;
                                    let middleware = middleware_1.default.getBean(allMiddlewares[resCallIdx]);
                                    res.append(middleware.post(req, res, responseCallStack));
                                }
                                else if (resCallIdx <= 0) {
                                    res.writeAndFlush(res.getData());
                                }
                            };
                            let requestCallStack = function () {
                                reqCallIdx++;
                                if (reqCallIdx >= mlen) {
                                    let ret = null;
                                    if (request.params && Object.keys(request.params).length > 0) {
                                        ret = controllerMetas.ins[handler](request.params, req, res);
                                    }
                                    else {
                                        ret = controllerMetas.ins[handler](req, res);
                                    }
                                    if (ret === null) {
                                        return;
                                    }
                                    if (Util.types.isPromise(ret)) {
                                        // if (getObjectType(ret) === 'promise') {
                                        ret.then(data => {
                                            res.append(data);
                                            responseCallStack();
                                        }).catch(err => {
                                            application.emit(application_2.ErrorEvent.REQUEST, err);
                                            reject(err);
                                        });
                                    }
                                    else {
                                        res.append(ret);
                                        responseCallStack();
                                    }
                                }
                                else if (reqCallIdx < mlen) {
                                    let middleware = middleware_1.default.getBean(allMiddlewares[reqCallIdx]);
                                    middleware.pre(req, res, requestCallStack);
                                }
                            };
                            if (!responseMiddleware) {
                                res.type('text/html');
                            }
                            requestCallStack();
                        });
                    });
                    application.route({
                        method: requestMethod,
                        path: path,
                        handler: requestHandler
                    });
                });
            });
        });
    }
    static addMVCProperty(controller, metas) {
        const application = application_1.default.getIns();
        let controllerPath = metas.file.split(application.controllerDir);
        controller.__file = metas.file;
        controller.__tplDir = application.resource + Path.sep
            + application.viewDir + Path.sep
            + 'template' + Path.sep
            + controllerPath.pop().replace(URL_PATH_TRIM, '').slice(0, -3).toLowerCase() + Path.sep;
        controller.__layoutDir = application.resource + Path.sep
            + application.viewDir + Path.sep
            + 'layout' + Path.sep;
        controller.__tplExt = application.tplExt;
        // controller.__method = method.toLowerCase();
    }
    static getCurrentController() {
        if (!index_1.default.currentFilePath) {
            return null;
        }
        const application = application_1.default.getIns();
        if (!Controller.container.get(index_1.default.currentFilePath)) {
            Controller.container.set(index_1.default.currentFilePath, {
                controller: {},
                methods: {},
                responseFormat: { clz: null, method: {} },
                file: index_1.default.currentFilePath,
                viewDir: application.resource + Path.sep + application.viewDir,
                ins: null
            });
        }
        return Controller.container.get(index_1.default.currentFilePath);
    }
    static addBean(target, { path, middlewares }) {
        if (!Controller.getCurrentController()) {
            return;
        }
        const currentController = Controller.getCurrentController().controller;
        Hoek.merge(currentController, {
            target: target,
            path: path,
            middlewares: middlewares
        });
    }
    static addMethod(target, method, path, handler, middleware) {
        if (!path || !method || !Controller.getCurrentController()) {
            return;
        }
        const currentMethods = Controller.getCurrentController().methods;
        currentMethods[handler] = {
            requestMethod: method,
            path: path,
            handler: handler,
            middlewares: middleware
        };
    }
    static addResponseFormat(target, handler, type) {
        let responseFormat = Controller.getCurrentController().responseFormat;
        if (typeof target === "object") {
            responseFormat['method'][handler] = type;
        }
        else if (typeof target === "function") {
            responseFormat['clz'] = type;
        }
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            Controller.container = null;
        });
    }
}
Controller.container = new Map();
exports.default = Controller;

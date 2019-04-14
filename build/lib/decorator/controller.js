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
const jbean_1 = require("jbean");
const application_1 = require("../application");
const base_1 = require("../base");
function Controller(component, path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.clz, controllerCallback, arguments);
}
exports.Controller = Controller;
function Get(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, methodCallback, ['GET', path]);
}
exports.Get = Get;
function Post(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, methodCallback, ['POST', path]);
}
exports.Post = Post;
function Put(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, methodCallback, ['PUT', path]);
}
exports.Put = Put;
function Patch(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, methodCallback, ['PATCH', path]);
}
exports.Patch = Patch;
function Options(path) {
    return jbean_1.annotationHelper(jbean_1.AnnotationType.method, methodCallback, ['OPTIONS', path]);
}
exports.Options = Options;
const controllerCallback = function (annoType, ctor, path) {
    controllers.push(ctor);
    addAnno(ctor, path);
};
const methodCallback = function (annoType, target, method, descriptor, requestMethod, path) {
    addAnno(target, path, method, requestMethod, true);
};
const URL_PATH_TRIM = /^\/*|\/*$/g;
const controllerMetas = {};
const controllers = [];
const addAnno = function (target, path, method, requestMethod, requestMapping) {
    let ctor = target;
    if (typeof target === 'object') {
        ctor = target.constructor;
    }
    let ctorId = ctor[jbean_1.CTOR_ID];
    if (typeof controllerMetas[ctorId] === 'undefined') {
        controllerMetas[ctorId] = {
            ctor: ctor,
            methods: [],
            path: ''
        };
    }
    let metas = controllerMetas[ctorId];
    if (!method) {
        metas.path = '/' + (path || '').replace(URL_PATH_TRIM, '');
        metas.path = (metas.path === '/') ? metas.path : (metas.path + '/');
    }
    else {
        metas.methods.push({
            target: target,
            method: method,
            requestMethod: requestMethod,
            subPath: (path || '').replace(URL_PATH_TRIM, ''),
            requestMapping: requestMapping
        });
    }
};
jbean_1.BeanFactory.registerInitBean(() => {
    controllers.forEach((controller) => {
        jbean_1.ReflectHelper.resetClass(controller);
    });
});
jbean_1.BeanFactory.registerStartBean(() => {
    Object.values(controllerMetas).forEach(({ ctor, methods, path }) => {
        methods.forEach(({ target, method, requestMethod, subPath, requestMapping }) => {
            if (requestMapping) {
                const app = application_1.default.getIns();
                app.route({
                    method: requestMethod,
                    path: path + subPath,
                    handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                        return new Promise((resolve, reject) => {
                            const req = new base_1.Request(request, h);
                            const res = new base_1.Response(request, h);
                            let ins = target;
                            if (typeof target !== 'function') {
                                ins = new ctor(req, res);
                            }
                            let params = [req, res];
                            if (request.params && Object.keys(request.params).length > 0) {
                                params.push(request.params);
                            }
                            try {
                                const ret = ins[method](...params);
                                if (jbean_1.getObjectType(ret) === 'promise') {
                                    ret.then(data => {
                                        res.writeAndFlush(data);
                                    }).catch(e => {
                                        app.emit(application_1.AppErrorEvent.REQUEST, e);
                                        res.error('Internal Server Error');
                                    });
                                }
                                else {
                                    res.writeAndFlush(ret);
                                }
                            }
                            catch (e) {
                                app.emit(application_1.AppErrorEvent.REQUEST, e);
                                res.error('Internal Server Error');
                            }
                        });
                    })
                });
            }
        });
    });
});

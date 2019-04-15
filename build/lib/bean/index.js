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
const utils_1 = require("../utils");
const dao_1 = require("./dao");
// import Bean from './bean'
// import Service from './service'
// import Repository from './repository'
// import Controller from './controller'
// import Middleware from './middleware'
class BeanFactory {
    static scan(dirs) {
        return __awaiter(this, void 0, void 0, function* () {
            // Bean.init()
            dao_1.default.init();
            // Service.init()
            // Repository.init()
            // Middleware.init()
            // Controller.init()
            dirs.forEach(dir => {
                utils_1.readDirSync(dir, (fpath, isFile) => {
                    if (fpath.endsWith('.js')) {
                        BeanFactory.currentFilePath = fpath;
                        require(fpath);
                    }
                });
            });
            yield dao_1.default.initBeans();
            // await Bean.initBeans()
            // await Service.initBeans()
            // await Repository.initBeans()
            // await Middleware.initBeans()
            // await Controller.initBeans()
        });
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            // await Controller.destroy()
            // await Middleware.destroy()
            // await Service.destroy()
            // await Repository.destroy()
            // await Bean.destroy()
            yield dao_1.default.destroy();
        });
    }
}
exports.default = BeanFactory;

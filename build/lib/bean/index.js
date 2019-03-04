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
const bean_1 = require("./bean");
const service_1 = require("./service");
const repository_1 = require("./repository");
const controller_1 = require("./controller");
const middleware_1 = require("./middleware");
class BeanFactory {
    static scan(dirs) {
        return __awaiter(this, void 0, void 0, function* () {
            bean_1.default.init();
            dao_1.default.init();
            service_1.default.init();
            repository_1.default.init();
            middleware_1.default.init();
            controller_1.default.init();
            dirs.forEach(dir => {
                utils_1.readDirSync(dir, (fpath, isFile) => {
                    if (fpath.endsWith('.js')) {
                        BeanFactory.currentFilePath = fpath;
                        require(fpath);
                    }
                });
            });
            yield dao_1.default.initBeans();
            yield bean_1.default.initBeans();
            yield service_1.default.initBeans();
            yield repository_1.default.initBeans();
            yield middleware_1.default.initBeans();
            yield controller_1.default.initBeans();
        });
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield controller_1.default.destroy();
            yield middleware_1.default.destroy();
            yield service_1.default.destroy();
            yield repository_1.default.destroy();
            yield bean_1.default.destroy();
            yield dao_1.default.destroy();
        });
    }
}
exports.default = BeanFactory;

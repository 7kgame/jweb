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
class Bean {
    static init() {
    }
    static initBeans() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    static getKey(name) {
        if (name && typeof name !== 'string') {
            if (!name.name) {
                return;
            }
            return name.name.toLowerCase();
        }
        else {
            return name.toLowerCase();
        }
    }
    static addBean0(container, target, options) {
        let key = Bean.getKey(options.key);
        if (container.get(key)) {
            return;
        }
        container.set(key, {
            target: target,
            ins: null
        });
    }
    static addBean(target, options) {
        Bean.addBean0(Bean.container, target, options);
    }
    static getBean0(container, name) {
        let key = Bean.getKey(name);
        if (!container.get(key)) {
            return;
        }
        const beanInfo = container.get(key);
        if (!beanInfo.ins) {
            beanInfo.ins = new (beanInfo.target)();
        }
        return beanInfo.ins;
    }
    static getBean(name) {
        return Bean.getBean0(Bean.container, name);
    }
    static destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            Bean.container = null;
        });
    }
    static remove(name) {
    }
}
Bean.container = new Map();
exports.default = Bean;

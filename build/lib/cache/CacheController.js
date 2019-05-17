"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class CacheController {
    constructor() {
        this.cacheQueue = new utils_1.LinkedQueue();
        this.cacheMap = {};
        this.MAX_CACHE_SIZE = 1024 * 1024 * 300;
        this.tempCacheSize = 0;
    }
    static getIns() {
        if (!CacheController.ins) {
            CacheController.ins = new CacheController();
            return CacheController.ins;
        }
        return CacheController.ins;
    }
    cache(key, val) {
        let buffer = Buffer.from(val);
        let tempSize = this.tempCacheSize + buffer.length;
        if (this.tempCacheSize + buffer.length >= this.MAX_CACHE_SIZE) {
            let temp = this.cacheQueue.pop().val;
            let tempBuffer = this.cacheMap[temp];
            tempSize -= tempBuffer.length;
            delete this.cacheMap[temp];
            while (tempSize >= this.MAX_CACHE_SIZE) {
                temp = this.cacheQueue.pop().val;
                tempBuffer = this.cacheMap[temp];
                tempSize = tempSize - tempBuffer.length;
                delete this.cacheMap[temp];
            }
        }
        this.cacheQueue.push(new utils_1.LinkedNode(key));
        this.cacheMap[key] = buffer;
        this.tempCacheSize = tempSize;
    }
    release(key) {
        let cacheBuffer = this.cacheMap[key];
        if (!cacheBuffer) {
            return false;
        }
        this.tempCacheSize -= cacheBuffer.length;
        delete this.cacheMap[key];
        return true;
    }
    hit(key) {
        return this.cacheMap[key] ? this.cacheMap[key].toString() : '';
    }
    reset() {
        while (!this.cacheQueue.empty()) {
            this.release(this.cacheQueue.pop().val);
        }
    }
}
CacheController.ins = null;
exports.default = CacheController;

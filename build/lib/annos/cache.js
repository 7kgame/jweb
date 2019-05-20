"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const LRUCache_1 = require("../cache/LRUCache");
const application_1 = require("../application");
exports.SET_CACHE = '__set_cache';
exports.GET_CACHE = '__get_cache';
function Cache(expire) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = Cache;
jbean_1.BeanFactory.registerStartBean(() => {
    let application = application_1.default.getIns();
    const configNS = application.configNS;
    const applicationConfigs = application.applicationConfigs;
    if (!applicationConfigs ||
        !applicationConfigs[configNS] ||
        !applicationConfigs[configNS].cache) {
        LRUCache_1.default.create({});
        return;
    }
    const cacheConfigs = applicationConfigs[configNS].cache;
    let max_cache_size = cacheConfigs.maxCacheSize || undefined;
    let expire = cacheConfigs.expire || undefined;
    if (max_cache_size) {
        max_cache_size = Number.parseInt(max_cache_size, 10);
    }
    if (expire) {
        expire = Number.parseInt(expire, 10);
    }
    LRUCache_1.default.create({
        max_cache_size,
        expire
    });
});
function setCache(url, val, expire) {
    LRUCache_1.default.getIns().set(url, val, expire);
}
function getCache(url) {
    return LRUCache_1.default.getIns().get(url);
}
const callback = function (annoType, ctor, field, expire) {
    if (typeof ctor === 'object') {
        ctor = ctor.constructor;
    }
    ctor['__' + field] = {};
    ctor['__' + field][exports.SET_CACHE] = setCache;
    ctor['__' + field][exports.GET_CACHE] = getCache;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const utils_1 = require("../../lib/utils");
function ResponseBody(type) {
    return jbean_1.annotationHelper(arguments, callback);
}
exports.default = ResponseBody;
const callback = function (annoType, ctor) {
    if (annoType === jbean_1.AnnotationType.clz) {
        jbean_1.BeanFactory.addBeanMeta(jbean_1.AnnotationType.clz, ctor, null, ResponseBody, [arguments[2]]);
    }
    else if (annoType === jbean_1.AnnotationType.method) {
        jbean_1.BeanFactory.addBeanMeta(jbean_1.AnnotationType.method, ctor, arguments[2], ResponseBody, [arguments[4]]);
    }
};
ResponseBody.preCall = function rbdPreCall(ret, type, req, res) {
    switch (type) {
        case 'json':
            res.type('application/json');
            break;
        case 'xml':
            res.type('application/xml');
            break;
        default:
            break;
    }
    return ret;
};
ResponseBody.postCall = function rbdPostCall(ret, type, req, res) {
    switch (type) {
        case 'json':
            if (typeof ret.data === 'object') {
                ret.data = utils_1.jsonEncode(ret.data);
            }
            break;
        case 'xml':
            ret.data = utils_1.xmlEncode(ret.data);
            break;
        default:
            break;
    }
    return ret;
};

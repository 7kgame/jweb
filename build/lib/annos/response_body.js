"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jbean_1 = require("jbean");
const utils_1 = require("../utils");
function ResponseBody(component, type) {
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
    console.log("response body precall", ret);
    return ret;
};
ResponseBody.postCall = function rbdPostCall(ret, type, req, res) {
    console.log("jsonbody line 31", ret);
    switch (type) {
        case 'json':
            if (typeof ret === 'object') {
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

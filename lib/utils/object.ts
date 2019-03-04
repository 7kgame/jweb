import * as Hoek from "hoek";

export function redefineProperty (target, key, config) {
  if (!config) {
    return;
  }
  let config0 = {
    enumerable: true,
    configurable: true
  };
  Hoek.merge(config0, config);

  if (delete target[key]) {
    Object.defineProperty(target, key, config0);
  }
}

export function getObjectType(obj) {
  if (obj === null) {
    return 'null';
  }
  if (obj === undefined) {
    return 'undefined';
  }
  return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
}

export function xmlEncode(ret: any) {
  let xmlContent = [];

  switch (getObjectType(ret)) {
    case 'map':
      ret.forEach((value , key) => {
        if (getObjectType(value) === 'object') {
          let res = xmlEncode(value);
          xmlContent.push('<' + key + '>' + res + '</' + key + '>');
        } else {
          xmlContent.push('<' + key + '>' + value + '</' + key + '>');
        }
      });
      break;
    case 'object':
      let key: any;
      for (key in ret) {
        if (getObjectType(ret[key]) === 'object') {
          let res = xmlEncode(ret[key]);
          xmlContent.push('<' + key + '>' + res + '</' + key + '>');
        } else {
          xmlContent.push('<' + key + '>' + ret[key] + '</' + key + '>');
        }
      }
      break;
    default:
      xmlContent = ret;
  }

  return xmlContent.join('');
}

export function jsonEncode(ret: any) {
  let type = getObjectType(ret);

  if (type === 'string') {
    return ret;
  } else if (type === 'map') {
    let obj = Object.create(null);
    for (let [k, v] of ret) {
      obj[k] = v;
    }
    ret = obj;
  }

  return JSON.stringify(ret);
}
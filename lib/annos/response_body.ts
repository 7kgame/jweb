import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'
import { Request, Response } from '../base'
import { jsonEncode, xmlEncode } from '../utils'

export default function ResponseBody (component?: any, type?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, ResponseBody, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], ResponseBody, [arguments[4]])
  }
}

ResponseBody.preCall = function (type: string, req: Request, res: Response) {
  switch (type) {
    case 'json':
      res.type('application/json')
      break
    case 'xml':
      res.type('application/xml')
      break
    default:
      break
  }
}

ResponseBody.postCall = function (ret: any, type: string, req: Request, res: Response) {
  switch (type) {
    case 'json':
      if (typeof ret === 'object') {
        ret = jsonEncode(ret)
      }
      break
    case 'xml':
      ret = xmlEncode(ret)
      break
    default:
      break
  }
  return ret
}

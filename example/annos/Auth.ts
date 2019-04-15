import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'
import * as util from 'util'

export default function Auth (component?: any, options?: any) {
  return annotationHelper(AnnotationType.clz, callback, arguments)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, Auth, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], Auth, [arguments[4]])
  }
}

Auth.preCall = function () {
  // console.log('auth.precall')
}

Auth.postCall = function (ret) {
  console.log('auth.postcall')
  return JSON.stringify(ret)
}

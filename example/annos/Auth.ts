import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'

export default function Auth (component?: any, options?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
  if (annoType === AnnotationType.clz) {
    BeanFactory.addBeanMeta(AnnotationType.clz, ctor, null, Auth, [arguments[2]])
  } else if (annoType === AnnotationType.method) {
    BeanFactory.addBeanMeta(AnnotationType.method, ctor, arguments[2], Auth, [arguments[4]])
  }
}

Auth.preCall = function () {
}

Auth.postCall = function (ret: any) {
  return ret
}

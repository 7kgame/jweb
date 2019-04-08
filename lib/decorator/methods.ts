import Controller from '../bean/controller'
import { AnnotationType, annotationHelper, BeanFactory, redefineProperty } from 'jbean'

const callback = function (target: object, method: string, descriptor: PropertyDescriptor, anno: Function, requestMethod: string, path?: string) {
  // console.log(anno)
  // console.log(requestMethod, path)
  BeanFactory.addAnnotation(AnnotationType.method, target, method, anno, [requestMethod, path])
  // console.log("method", method, target['__ctorId'], target.constructor['__ctorId'])
  // target.constructor._id = 'a123'
  // console.log('method', prop, target.constructor._id)
  // console.log(target)
  // console.log('method1 ---- ', typeof target)
  // console.log(target.constructor)
  // console.log(path, prop, target)
  // console.log(typeof target)
  // redefineProperty(target, prop, {
  //   get: function () {
  //     return BeanFactory.getBean(name)
  //   }
  // })
}

export function All(path: string) {
  return annotationHelper(AnnotationType.method, callback, [All, '*', path])
}

export function Get(path: string) {
  return annotationHelper(AnnotationType.method, callback, [Get, 'GET', path])
}

export function Post(path: string) {
  return annotationHelper(AnnotationType.method, callback, [Post, 'POST', path])
}

export function Put(path: string) {
  return annotationHelper(AnnotationType.method, callback, [Put, 'PUT', path])
}

export function Patch(path: string) {
  return annotationHelper(AnnotationType.method, callback, [Patch, 'PATCH', path])
}

export function Options(path: string) {
  return annotationHelper(AnnotationType.method, callback, [Options, 'OPTIONS', path])
}

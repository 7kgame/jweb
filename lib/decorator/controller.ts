// import Controller from '../bean/controller'
// import IMiddleware from '../base/middleware'

import { AnnotationType, annotationHelper, BeanFactory, redefineProperty } from 'jbean'

const callback = function (ctor: Function, path?: string) {
  BeanFactory.addAnnotation(AnnotationType.clz, ctor, null, Controller, [path])
  console.log(ctor.name, ctor['__ctorId'])
}

export default function Controller (component?: any, path?: any) {
  return annotationHelper(AnnotationType.clz, callback, arguments)
}

// export default function (path?: string, middlewares?: any) {
//   console.log('controller: ', path)
//   return (target): void => {
//     Controller.addBean(target, {
//       path: path,
//       middlewares: middlewares
//     })
//   }
// }

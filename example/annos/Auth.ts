import { AnnotationType, annotationHelper, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'
import { Request, Response } from '../../lib'

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

Auth.preCall = function (param: string, req: Request, res: Response) {
  // console.log(arguments)
  if (param === 'ignore') {
    console.log('return login data')
    return null
  }
}

Auth.postCall = function (ret: any) {
  return ret
}

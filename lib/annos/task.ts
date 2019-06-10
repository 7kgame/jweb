import { AnnotationType, annotationHelper, checkSupportTransition, BeanFactory, CTOR_ID, getObjectType, isAsyncFunction } from 'jbean'

export default function Task (target?: any) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: object | Function) {
}

Task.checkTransactional = function (ctor: Function, ins: object, method: string) {
  if (checkSupportTransition(ctor, method)) {
    BeanFactory.genRequestId(ins)
  }
}
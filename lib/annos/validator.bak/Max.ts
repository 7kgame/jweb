import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Max(max: number, message?: string) {
  return annotationHelper(arguments, callback)
}

Max.validate = function (field: string, val: any, params: any[], fieldType: string): {err: string, val: any} {
  let [max, message] = params
  let err = null
  if (val > max) {
    err = getMessage(field, val, params)
  }
  return {
    err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [max, message] = params
  if (!message) {
    message = 'the value of $field must be smaller than $max'
  }
  return format(message, {field, max, val})
}

const callback = function(annoType: AnnotationType, ctor: Function, field: string, max:number, message?: string) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Max, [max, message])
}
import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { format } from '../../utils'

export default function Required(component?: any, options?: any) {
  return annotationHelper(arguments, callback)
}

Required.validate = function (field: string, val: any, params: any[], fieldType: string): {err: string, val: any} {
  let err = null
  if (val === null || val === undefined) {
    err = getMessage(field, val, params)
  }
  return {
    err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [message] = params
  if (!message) {
    message = 'key $field is required'
  }
  return format(message, {field, val})
}

const callback = function(annoType: AnnotationType, ctor: Function, field: string, message?: string) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Required, [message])
}
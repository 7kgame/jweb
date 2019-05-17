import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

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
  if (message) {
    return message
  } else {
    return `key '${field}' is required`
  }
}

// function validate(val: any): {valid: boolean, val: any} {
//   if (val === null || val === undefined) {
//     return {valid: false, val: val}
//   }
//   return {valid: true, val: val}
// }
// function message(field: string, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `"key '${field}' is required"`
//   }
// }

const callback = function(annoType: AnnotationType, ctor: Function, field: string, message?: string) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Required, [message])
}
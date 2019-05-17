import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

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
  if (message) {
    return message
  } else {
    return `the value of ${field} must smaller than ${max}`
  }
}

// function validate(maxVal: number) {
//   return (val):{valid: boolean, val: any} => {
//     if (val <= maxVal) {
//       return {valid: true, val: val}
//     } else {
//       return { valid: false, val: null}
//     }
//   }
// }

// function message(field: string, maxVal:number, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `the value of ${field} must smaller than ${maxVal}`
//   }
// }

const callback = function(annoType: AnnotationType, ctor: Function, field: string, max:number, message?: string) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Max, [max, message])
}
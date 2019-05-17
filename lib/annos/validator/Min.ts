import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Min(min: number, message?: string) {
  return annotationHelper(arguments, callback)
}

Min.validate = function (field: string, val: any, params: any[], fieldType: string): {err: string, val: any} {
  let [min, message] = params
  return {
    err: null,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [min, message] = params
  return message
}

// function validate(minVal: number) {
//   return (val):{valid: boolean, val: any} => {
//     if (val >= minVal) {
//       return {valid: true, val: val}
//     } else {
//       return { valid: false, val: null}
//     }
//   }
// }
// function message(field: string, minVal:number, mes?: string) {
//   if (mes) {
//     return () => mes
//   } else {
//     return () => `the value of ${field} must larger than ${minVal}`
//   }
// }

const callback = function(annoType: AnnotationType, ctor: Function, field: string, min:number, message?: string) {
  BeanFactory.addBeanMeta(annoType, ctor, field, Min, [min, message])
}
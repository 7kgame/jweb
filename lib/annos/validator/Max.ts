import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Max(maxVal: number, mes?: string) {
  return annotationHelper([maxVal, mes], callback)
}
function validate(maxVal: number) {
  return (val):{valid: boolean, val: any} => {
    if (val <= maxVal) {
      return {valid: true, val: val}
    } else {
      return { valid: false, val: null}
    }
  }
}
function message(field: string, maxVal:number, mes?: string) {
  if (mes) {
    return () => mes
  } else {
    return () => `the value of ${field} must smaller than ${maxVal}`
  }
}
Max['validate'] = {}
const callback = function(annoType: AnnotationType, ctor: Function, field: string, maxVal:number, mes?: string) {
  // add descriptor info into BeanFactory, using it in Validation
  Max['validate'][field] = {
    validate: validate(maxVal),
    message: message(field, maxVal, mes)
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Max)
}
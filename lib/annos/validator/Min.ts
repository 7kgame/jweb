import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Min(minVal: number, mes?: string) {
  return annotationHelper([minVal, mes], callback)
}
function validate(minVal: number) {
  return (val):{valid: boolean, val: any} => {
    if (val >= minVal) {
      return {valid: true, val: val}
    } else {
      return { valid: false, val: null}
    }
  }
}
function message(field: string, minVal:number, mes?: string) {
  if (mes) {
    return () => mes
  } else {
    return () => `the value of ${field} must larger than ${minVal}`
  }
}
Min['validate'] = {}
const callback = function(annoType: AnnotationType, ctor: Function, field: string, minVal:number, mes?: string) {
  // add descriptor info into BeanFactory, using it in Validation
  Min['validate'][field] = {
    validate: validate(minVal),
    message: message(field, minVal, mes)
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Min)
}
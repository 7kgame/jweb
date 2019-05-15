import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Size(min: number, max?: number|string, mes?: string) {
  return annotationHelper([min, max, mes], callback)
}

function validate(min: number, max?: number|string) {
  return (val: any): {valid: boolean, val: any} => {
    if (val.length && val.length < min) {
      return {valid:false, val: val}
    }
    if (typeof max === 'number' && val.length && val.length > max) {
      return {valid:false, val: val}
    }
    return {valid:true, val: val}
  }
}

function message(field: string, min:number, max: number|string, mes?: string) {
  if (mes) {
    return () => mes
  } else if (max && typeof max === 'string' ) {
    return () => max
  } else {
    return () => {
      if (max) {
        return `the length of '${field}' must between ${min} and ${max}`
      } else {
        return `the length of '${field}' must larger than ${min}"`
      }
    }
  }
}
Size['validate'] = {}
const callback = function(annoType: AnnotationType, ctor: Function, field: string, min: number, max?:number|string, mes?: string) {
  // add descriptor info into BeanFactory, using it in Validation
  Size['validate'][field] = {
    validate: validate(min, max),
    message: message(field, min, max, mes)
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Size)
}
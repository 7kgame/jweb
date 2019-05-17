import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Size(min: number, max?: number | string, message?: string) {
  return annotationHelper(arguments, callback)
}

Size.validate = function (field: string, val: any, params: any[], fieldType: string): { err: string, val: any } {
  let [min, max, message] = params
  let err = null
  val += ''
  let len = val.length
  if (len < min || len > max) {
    err = getMessage(field, val, params)
  }
  return {
    err: err,
    val: val
  }
}

const getMessage = function (field: string, val: any, params: any[]) {
  let [min, max, message] = params
  if (message) {
    return message
  } else if (max && typeof max === 'string') {
    return max
  } else {
    if (max) {
      return `the length of '${field}' must between ${min} and ${max}`
    } else {
      return `the length of '${field}' must larger than ${min}"`
    }
  }
}

const callback = function (annoType: AnnotationType, ctor: Function, field: string, min: number, max?: number | string, message?: string) {
  if (typeof max === 'string') {
    message = max
    max = Number.MAX_VALUE
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Size, [min, max, message])
}
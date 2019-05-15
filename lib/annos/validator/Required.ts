import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Required(component?: any, options?: any) {
  return annotationHelper(arguments, callback)
}
function validate(val: any): {valid: boolean, val: any} {
  if (val === null || val === undefined) {
    return {valid: false, val: val}
  }
  return {valid: true, val: val}
}
function message(field: string, mes?: string) {
  if (mes) {
    return () => mes
  } else {
    return () => `"key '${field}' is required"`
  }
}
Required['validate'] = {}
const callback = function(annoType: AnnotationType, ctor: Function, field: string, mes?: string) {
  // console.log("Required at line 8", arguments)
  // add descriptor info into BeanFactory, using it in Validation
  Required['validate'][field] = {
    validate,
    message: message(field, mes)
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Required)
}
import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Type(type: string, autoTrans?: boolean) {
  return annotationHelper(arguments, callback)
}
function validate(type: string, autoTrans?: boolean|string) {
  return (val: any): {valid: boolean, val: any} => {
    switch (type) {
      case 'integer':
        if (autoTrans) {
          val = Number.parseInt(val, 10)
        }
        let isInt = Number.isInteger(val)
        return {valid: isInt, val: val}
      case 'number':
        if (autoTrans) {
          val = Number(val)
        }
        let isNum = typeof val === 'number'
        return {valid: isNum, val: val}
      case 'string':
        if (autoTrans) {
          val = String(val)
        }
        let isStr = typeof val === 'string'
        return {valid: isStr, val: val }
    }
  }
}
function message(field: string, type:string, autoTrans?:boolean|string, mes?: string) {
  if (mes) {
    return () => mes
  } else if (autoTrans && typeof autoTrans === 'string') {
    return () => autoTrans
  } else {
    return (val) => {
      return `${field}: can't assign type ${typeof val} to ${type}`
    }
  }
}

Type['validate'] = {}
const callback = function(annoType: AnnotationType, ctor: Function, field: string, type:string, autoTrans?:boolean|string, mes?: string) {
  // console.log("Required at line 8", arguments)
  // add descriptor info into BeanFactory, using it in Validation
  Type['validate'][field] = {
    validate: validate(type, autoTrans),
    message: message(field, type, autoTrans, mes)
  }
  BeanFactory.addBeanMeta(annoType, ctor, field, Type)
}
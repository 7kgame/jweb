import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'

export default function Entity (name?: Function | string) {
  return annotationHelper(arguments, callback)
}

const callback = function (annoType: AnnotationType, ctor: Function, name?: string) {
  // console.log(name)
  // TODO
  ctor.prototype.toObject = function () {
    const fields = Object.getOwnPropertyNames(this)
    const obj = {}
    fields.forEach(field => {
      if (this[field] !== undefined) {
        obj[field] = this[field]
      }
    })
    return obj
  }
}
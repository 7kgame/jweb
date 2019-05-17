import { AnnotationType, annotationHelper, BeanFactory, BeanMeta } from 'jbean'

export default function Entity (name?: Function | string | TableNameSeperatorType) {
  return annotationHelper(arguments, callback)
}

export enum TableNameSeperatorType {
  underline
}

const callback = function (annoType: AnnotationType, ctor: Function, name?: string|TableNameSeperatorType) {
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
  ctor['clone'] = function (data: object) {
    if (!data) {
      return null
    }
    const clz: any = ctor
    const entity = new clz()
    const fields = Object.getOwnPropertyNames(entity)
    fields.forEach(field => {
      if (typeof data[field] !== 'undefined') {
        entity[field] = data[field]
      }
    })
    return entity
  }

  if (name && typeof name === 'string') {
    ctor['$tableName'] = name
  } else if (!name || (name && typeof name === 'number' && name === TableNameSeperatorType.underline)) {
    ctor['$tableName'] = (ctor.name.charAt(0) + ctor.name.substr(1).replace(/([A-Z])/g, '_$1')).toLowerCase()
  } else {
    throw new Error('wrong arguments of @entity')
  }
}

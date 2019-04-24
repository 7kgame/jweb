import { AnnotationType, annotationHelper, BeanFactory } from 'jbean'
import { Request, Response } from '../../lib'

export default function Validation (entity: Function, mode?: number) {
  return annotationHelper([entity, mode], callback)
}

const callback = function (annoType: AnnotationType, target: object, method: string, descriptor: PropertyDescriptor, entityClz: Function, mode?: number) {
  BeanFactory.addBeanMeta(AnnotationType.method, target, method, Validation, [entityClz, mode])
}

Validation.preCall = function (entityClz: any, mode: number, req: Request, res: Response) {
  const params = Object.assign({}, req.params, req.query, req.payload)
  if (!params || Object.keys(params).length < 1) {
    return
  }
  const entity = new entityClz()
  const fields = Object.getOwnPropertyNames(entity)
  if (fields && fields.length > 0) {
    fields.forEach(field => {
      if (typeof params[field] !== 'undefined') {
        entity[field] = params[field]
      }
    })
    req.entity = entity
  }
  // TODO validate
}

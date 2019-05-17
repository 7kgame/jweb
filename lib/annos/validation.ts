import { AnnotationType, annotationHelper, BeanFactory, BeanMeta, getObjectType, BusinessException } from 'jbean'
import { Request, Response } from '../../lib'

export default function Validation (entity: Function, mode?: number) {
  return annotationHelper([entity, mode], callback)
}

const callback = function (annoType: AnnotationType, target: object, method: string, descriptor: PropertyDescriptor, entityClz: Function, mode?: number) {
  BeanFactory.addBeanMeta(AnnotationType.method, target, method, Validation, [entityClz, mode])
}

Validation.preCall = function vldPreCall(ret: any, entityClz: any, mode: number, req: Request, res: Response) {
  if (ret && ret.err) {
    return ret
  }
  const params = Object.assign({}, req.params, req.query, req.payload)
  const entity = new entityClz()
  const fields = Object.getOwnPropertyNames(entity)
  if (!fields) {
    return
  }

  let beanMeta: BeanMeta = BeanFactory.getBeanMeta(entity.constructor)
  let fieldAnnos = beanMeta.fieldAnnos
  let fieldType = beanMeta.fieldType

  let err0 = null
  fields.forEach(field => {
    if (typeof fieldAnnos[field] === 'undefined') {
      entity[field] = params[field]
      return
    }
    let val0 = params[field]
    let validators = fieldAnnos[field]
    let hasError = false
    validators.forEach(([validator, validatorParams]) => {
      if (hasError || !validator.validate) {
        return
      }
      let {err, val} = validator.validate(field, val0, validatorParams, fieldType[field])
      if (err) {
        err0 = err0 || {}
        err0[field] = err
        hasError = true
      } else {
        entity[field] = val
      }
    })
  })
  if (!err0) {
    req.entity = entity
    return
  } else {
    return {
      err: new BusinessException('', -1, err0)
    }
  }
}

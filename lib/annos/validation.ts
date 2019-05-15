import { AnnotationType, annotationHelper, BeanFactory, BeanMeta } from 'jbean'
import { Request, Response } from '../../lib'

export default function Validation (entity: Function, mode?: number) {
  return annotationHelper([entity, mode], callback)
}

const callback = function (annoType: AnnotationType, target: object, method: string, descriptor: PropertyDescriptor, entityClz: Function, mode?: number) {
  BeanFactory.addBeanMeta(AnnotationType.method, target, method, Validation, [entityClz, mode])
}

Validation.preCall = function vldPreCall(ret: any, entityClz: any, mode: number, req: Request, res: Response) {
  if (ret.err) {
    return ret
  }
  const params = Object.assign({}, req.params, req.query, req.payload)
  if (!params || Object.keys(params).length < 1) {
    return
  }
  const entity = new entityClz()
  // get BeanMeta and validate
  let beanMeta: BeanMeta = BeanFactory.getBeanMeta(entity.constructor)
  let metaFields = beanMeta.fieldAnnos

  const fields = Object.getOwnPropertyNames(entity)

  let err = null
  if (fields && fields.length > 0) {
    fields.forEach(field => {
      let validators = metaFields[field]
      if (!validators) { // no validator, copy
        if (typeof params[field] !== 'undefined') {
          entity[field] = params[field]
        }
        return
      }
      let validVal = params[field]
      for (let i = 0; i < validators.length; i++) {
        let validate: Function = validators[i][0].validate[field].validate
        let message: Function = validators[i][0].validate[field].message
        if (typeof validate !== 'function') {
          console.log('\x1B[33m%s\x1b[0m', `the typeof validate of ${validators[i][0].name} is not Function`)
          continue
        }
        if (typeof message !== 'function') {
          console.log('\x1B[33m%s\x1b[0m', `the typeof message of ${validators[i][0].name} is not Function`)
          continue
        }
        let validation = validate(validVal)
        if (!validation.valid) {
          let mes = message(validVal)
          if (err === null) {
            err = {}
          }
          err[field] = mes
          break
        }
        validVal = validation.val
      }
      entity[field] = validVal
    })
    req.entity = entity
  }
  return {
    err,
    data: entity,
  }
}

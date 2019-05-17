import { AnnotationType, annotationHelper, BeanFactory, BeanMeta, getObjectType } from 'jbean'
import { Request, Response } from '../../lib'

export default function Validation (entity: Function, mode: number = ValidationMode.entity) {
  return annotationHelper([entity, mode], callback)
}

export enum ValidationMode {
  params, // validation based on params
  entity, // validation based on entity property
  intersect // validation based on the intersection of params and entity
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

  return _validateByMode(entity, fields, params, fieldAnnos, fieldType, mode, req)
  // let err0 = null
  // fields.forEach(field => {
  //   if (typeof fieldAnnos[field] === 'undefined') {
  //     entity[field] = params[field]
  //     return
  //   }
  //   let val0 = params[field]
  //   let validators = fieldAnnos[field]
  //   let hasError = false
  //   validators.forEach(([validator, validatorParams]) => {
  //     if (hasError || !validator.validate) {
  //       return
  //     }
  //     let {err, val} = validator.validate(field, val0, validatorParams, fieldType[field])
  //     if (err) {
  //       err0 = err0 || {}
  //       err0[field] = err
  //       hasError = true
  //     } else {
  //       entity[field] = val
  //     }
  //   })
  // })
  // if (!err0) {
  //   req.entity = entity
  // }
  // return {
  //   err: err0,
  //   data: entity
  // }
}

function _validateByMode (entity, fields, params, fieldAnnos, fieldType, mode, req:Request) {
  let ret
  switch (mode) {
    case ValidationMode.entity:
      ret = _validateData(entity, fields, params, fieldAnnos, fieldType)
      break
    case ValidationMode.params:
      ret = _validateData(entity, Object.keys(params), params, fieldAnnos, fieldType)
      break
    case ValidationMode.intersect:
      let newFields = fields.filter((val) => {
        return params[val] !== undefined
      })
      ret = _validateData(entity, newFields, params, fieldAnnos, fieldType)
      break
    default:
      ret = _validateData(entity, fields, params, fieldAnnos, fieldType)
  }
  if (!ret.err0) {
    req.entity = ret.data
  }
  return {
    err: ret.err0,
    data: ret.data
  }
}

function _validateData (entity, data, params, fieldAnnos, fieldType) {
  let err0 = null
  data.forEach(field => {
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
  return {
    err0,
    data:entity
  }
}
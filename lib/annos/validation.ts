import { AnnotationType, annotationHelper, BeanFactory, BeanMeta, BusinessException, CTOR_ID } from 'jbean'
import { Request, Response } from '../../lib'

export enum ValidationMode {
  params, // validation based on params
  entity  // validation based on entity property
}

const validationMode4Entities = {}

export function ValidationScene (...scenes) {
  return annotationHelper(arguments, sceneCallback)
}

const sceneCallback = function(annoType: AnnotationType, target: object, field: string, ...scenes) {
  if (!scenes || scenes.length < 1) {
    return
  }
  const ctorId = target.constructor[CTOR_ID]
  if (typeof validationMode4Entities[ctorId] === 'undefined') {
    validationMode4Entities[ctorId] = {}
  }
  scenes.forEach(scene => {
    scene = 's_' + scene
    if (typeof validationMode4Entities[ctorId][scene] === 'undefined') {
      validationMode4Entities[ctorId][scene] = []
    }
    validationMode4Entities[ctorId][scene].push(field)
  })
}

export default function Validation (entityClz: Function, mode?: ValidationMode | string) {
  return annotationHelper(arguments, callback, true)
}

const callback = function (annoType: AnnotationType, target: Function | object, method: string, descriptor: PropertyDescriptor, entityClz: Function, mode?: ValidationMode | string) {
  BeanFactory.addBeanMeta(AnnotationType.method, target, method, Validation, [entityClz, mode])
}

Validation.preCall = function vldPreCall(ret: any, entityClz: any, mode: ValidationMode | string, req: Request, res: Response) {
  if (ret && ret.err) {
    return ret
  }
  const params = Object.assign({}, req.params, req.query, req.payload)
  const entity = new entityClz()
  let fields: string[] = Object.getOwnPropertyNames(entity)
  if (!fields || fields.length < 1) {
    return
  }

  let assignedFields: string[] = null
  if (mode === undefined || mode === ValidationMode.params) {
    assignedFields = Object.keys(params)
  } else if (mode === ValidationMode.entity) {
    assignedFields = fields
  } else if (typeof mode === 'string') {
    const ctorId = entityClz[CTOR_ID]
    const scene = 's_' + mode
    if (validationMode4Entities[ctorId] && validationMode4Entities[ctorId][scene]) {
      assignedFields = validationMode4Entities[ctorId][scene]
    }
  }
  if (!assignedFields || assignedFields.length < 1) {
    return {
      err: new BusinessException('validate field is empty', -1)
    }
  }

  if (mode !== ValidationMode.entity) {
    fields = fields.filter( field => {
      return assignedFields.indexOf(field) >= 0
    })
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
      err: new BusinessException('validate failed', -2, err0)
    }
  }
}
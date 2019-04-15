import * as Hapi from 'hapi'
import { AnnotationType, annotationHelper, BeanFactory, BeanMeta, CTOR_ID, getObjectType, ReflectHelper } from 'jbean'

import Application, { AppErrorEvent } from '../application'
import { Request, Response } from '../base'

export function Controller (component?: any, path?: any) {
  return annotationHelper(AnnotationType.clz, controllerCallback, arguments)
}

export function Get(path: string) {
  return annotationHelper(AnnotationType.method, methodCallback, ['GET', path])
}

export function Post(path: string) {
  return annotationHelper(AnnotationType.method, methodCallback, ['POST', path])
}

export function Put(path: string) {
  return annotationHelper(AnnotationType.method, methodCallback, ['PUT', path])
}

export function Patch(path: string) {
  return annotationHelper(AnnotationType.method, methodCallback, ['PATCH', path])
}

export function Options(path: string) {
  return annotationHelper(AnnotationType.method, methodCallback, ['OPTIONS', path])
}

const controllerCallback = function (annoType: AnnotationType, ctor: Function, path?: string) {
  controllers.push(ctor)
  addAnno(ctor, path)
}

const methodCallback = function (annoType: AnnotationType, target: object, method: string, descriptor: PropertyDescriptor, requestMethod: string, path?: string) {
  addAnno(target, path, method, requestMethod, true)
}

const URL_PATH_TRIM = /^\/*|\/*$/g

const controllerMetas = {}
const controllers: Function[] = []

const addAnno = function (target: object | Function, path: string, method?: string, requestMethod?: string, requestMapping?: boolean) {
  let ctor = target
  if (typeof target === 'object') {
    ctor = target.constructor
  }
  let ctorId = ctor[CTOR_ID]
  if (typeof controllerMetas[ctorId] === 'undefined') {
    controllerMetas[ctorId] = {
      ctor: ctor,
      methods: [],
      path: ''
    }
  }
  let metas = controllerMetas[ctorId]
  if (!method) {
    metas.path = '/' + (path || '').replace(URL_PATH_TRIM, '')
    metas.path = (metas.path === '/') ? metas.path : (metas.path + '/')
  } else {
    metas.methods.push({
      target: target,
      method: method,
      requestMethod: requestMethod,
      subPath: (path || '').replace(URL_PATH_TRIM, ''),
      requestMapping: requestMapping
    })
  }
}

BeanFactory.registerInitBean(() => {
  controllers.forEach((controller: Function) => {
    ReflectHelper.resetClass(controller)
  })
})

const controllerIns = {}

BeanFactory.registerStartBean(() => {
  Object.values(controllerMetas).forEach(({ctor, methods, path}) => {
    methods.forEach(({target, method, requestMethod, subPath, requestMapping}) => {
      if (requestMapping) {
        const app = Application.getIns()
        app.route({
          method: requestMethod,
          path: path + subPath,
          handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return new Promise((resolve, reject) => {
              const req = new Request(request, h)
              const res = new Response(request, h)
              let ins = target
              if (typeof target !== 'function') {
                if (typeof controllerIns[ctor[CTOR_ID]] === 'undefined') {
                  controllerIns[ctor[CTOR_ID]] = new ctor()
                }
                ins = controllerIns[ctor[CTOR_ID]]
              }
              let params: any[] = [req, res]
              if (request.params && Object.keys(request.params).length > 0) {
                params.push(request.params)
              }
              try {
                const ret = ins[method](...params)
                if (getObjectType(ret) === 'promise') {
                  ret.then(data => {
                    res.writeAndFlush(data)
                  }).catch(e => {
                    app.emit(AppErrorEvent.REQUEST, e)
                    res.error('Internal Server Error')
                  })
                } else {
                  res.writeAndFlush(ret)
                }
              } catch (e) {
                app.emit(AppErrorEvent.REQUEST, e)
                res.error('Internal Server Error')
              }
            })
          }
        })
      }
    })
  })
})
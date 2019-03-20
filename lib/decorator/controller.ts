import Controller from '../bean/controller'
import IMiddleware from '../base/middleware'

export default function (path?: string, middlewares?: any) {
  return (target): void => {
    Controller.addBean(target, {
      path: path,
      middlewares: middlewares
    })
  }
}

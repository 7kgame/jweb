import Bean from './bean'
import IMiddleware from '../base/middleware'

export default class Middleware {

  private static container = new Map()

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
  }

  public static addBean(key: any, target: any): void {
    Bean.addBean0(Middleware.container, target, {
      key: key
    })
  }

  public static getBean(target: string | IMiddleware) {
    return Bean.getBean0(Middleware.container, target)
  }

  public static async destroy (): Promise<void> {
    Middleware.container = null
  }

}

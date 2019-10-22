import * as Hapi from 'hapi'

import ReqRes from './reqres'

export default class Request extends ReqRes {

  public url
  public path
  public payload
  public query
  public params
  public paramsArray
  public headers
  public cookies
  public entity: any
  public innerParams: {}

  private request: Hapi.Request
  private response: Hapi.ResponseToolkit

  // constructor (request: Hapi.Request, response: Hapi.ResponseToolkit, resolve: any, reject: any) {
  constructor (request: Hapi.Request, response: Hapi.ResponseToolkit) {
    super()
    this.url = request.url
    this.path = request.path
    this.payload = request.payload
    this.query = request.query
    this.params = request.params
    this.paramsArray = request.paramsArray
    this.headers = request.headers
    this.cookies = request.state

    this.request = request
    this.response = response
  }

  public getParam (key: string, defaultValue?: any): any {
    if (this.params && typeof this.params[key] !== 'undefined') {
      return this.params[key]
    }
    if (this.query && typeof this.query[key] !== 'undefined') {
      return this.query[key]
    }
    if (this.payload && typeof this.payload[key] !== 'undefined') {
      return this.payload[key]
    }
    return defaultValue || null
  }

  public getNum (key: string, defaultValue?: number): number {
    const val = this.getParam(key, defaultValue)
    if (val === null) {
      return defaultValue || null
    }
    if (!val) {
      return 0
    }
    return val - 0
  }

  public getString (key: string, defaultValue?: string): string {
    const val = this.getParam(key, defaultValue)
    if (val === null) {
      return defaultValue || null
    }
    return String(val)
  }

  public getBool (key: string, defaultValue?: boolean): boolean {
    const val = this.getParam(key, defaultValue)
    if (val === null) {
      return defaultValue || null
    }
    return Boolean(val)
  }

}

import { EventEmitter } from "events"

export class Application extends EventEmitter {
  constructor()

  readonly properties: any

  readonly root: string
  readonly resource: string

  readonly configNS: string
  readonly controllerDir: string
  readonly viewDir: string
  readonly tplExt: string

  // static create (option: object): Application
  static getIns (): Application
  // options (options: any): Application;
  static start (root: string): Promise<Application>
  route (option: object): Application
  addProperty (property: object): Application
}

export class AppErrorEvent {
  static readonly REQUEST: string
}

import * as Path from 'path'
import * as Hapi from "hapi"
import * as Inert from "inert"
import * as Hoek from "hoek"
import * as YAML from 'yaml'
import { EventEmitter } from "events"

import { BeanFactory, getApplicationConfigs, registerConfigParser, JBootApplication } from 'jbean'
import starters from './starters'

const defaultOptions = {
  port: 3000,
  host: 'localhost',

  configNS: 'node-web',
  controllerDir: 'controller',
  viewDir: 'view',
  tplExt: 'html'
}

export enum AppErrorEvent {
  REQUEST = 'error_request'
}

registerConfigParser('yml', function (content) {
  if (!content) {
    return null
  }
  return YAML.parse(content)
})

export default class Application extends EventEmitter {

  private static ins: Application

  public isDev: boolean = process.env.NODE_ENV === 'development'

  private appOptions: any = {}
  public properties = {}
  public applicationConfigs = {}

  public root: string
  public assets: string

  public configNS: string
  public controllerDir: string
  public viewDir: string
  public tplExt: string

  public isWebApp: boolean

  private server: Hapi.Server

  constructor () {
    super()
  }

  public static create (options?: object): Application {
    const ins = Application.ins = new Application()
    ins.appOptions = Hoek.applyToDefaults(defaultOptions, options || {})
    ins.configNS = ins.appOptions.configNS
    ins.applicationConfigs = getApplicationConfigs()
    return ins
  }

  public static getIns (): Application {
    return Application.ins
  }

  public init (): void {
    this.root = Path.dirname(require.main.filename)

    const appConfigs = this.applicationConfigs[this.configNS].app

    this.bindEvent()

    this.isWebApp = true

    if (this.isWebApp) {
      this.server = new Hapi.Server({
        port: appConfigs.port || defaultOptions.port,
        host: appConfigs.host || defaultOptions.host,
        state: {
          strictHeader: false
        }
      })

      if (typeof appConfigs.assets !== 'undefined') {
        this.assets = appConfigs.assets
        if (!Path.isAbsolute(this.assets)) {
          this.assets = Path.join(Path.dirname(this.root), this.assets)
        }
      }

      this.controllerDir = appConfigs.controllerDir || defaultOptions.controllerDir
      if (process.env.NODE_ENV === 'development') {
        this.viewDir = Path.join(Path.dirname(Path.dirname(this.root)), 'src', appConfigs.viewDir || defaultOptions.viewDir)
      } else {
        this.viewDir = appConfigs.viewDir || defaultOptions.viewDir
      }
      this.tplExt = appConfigs.tplExt || defaultOptions.tplExt
    }
  }

  private bindEvent (): void {
    this.on(AppErrorEvent.REQUEST, err => {
      console.error("Request error: ", err)
    })
  }

  public async runWebServer () {
    await this.server.register(Inert)
    if (this.assets) {
      this.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
            path: this.assets,
            redirectToSlash: false,
            index: true,
          }
        }
      })
    }
    await this.server.start()
    console.log(`Server running at: ${this.server.info.uri}`)
  }

  public static async start (): Promise<Application> {
    BeanFactory.initBean()

    const application = Application.create()
    application.init()

    BeanFactory.startBean()

    await starters(application)

    if (application.isWebApp) {
      await application.runWebServer()
    } else {

    }
    application.registerExit()

    return application
  }

  public route (option: any): Application {
    option.options = {cors: true}
    this.server.route(option)
    return this
  }

  public addProperty (property): Application {
    Hoek.merge(this.properties, property, false, true);
    return this
  }

  public registerExit (): void {
    let exitHandler = function (options, code) {
      if (options && options.exit) {
        console.log('application exit at', code)
        BeanFactory.destroyBean()
        process.exit()
      } else {
        console.log('exception', code)
      }
    }

    process.on('exit', exitHandler.bind(this, {exit: true}))

    // catch ctrl+c event
    process.on('SIGINT', exitHandler.bind(this, {exit: true}))

    // catch "kill pid"
    process.on('SIGUSR1', exitHandler.bind(this, {exit: true}))
    process.on('SIGUSR2', exitHandler.bind(this, {exit: true}))

    // catch uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(this, {exit: false}))
  }
}

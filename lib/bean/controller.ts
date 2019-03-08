import * as Path from 'path';
import * as Hoek from "hoek";
import * as Hapi from 'hapi';
// import * as Util from 'util';

import BeanFactory from './index';
import Middleware from './middleware';
import Application from '../application';
import { AppErrorEvent } from '../application';
import { Request, Response } from '../base';
import getInnerMiddleware from '../middleware';
import { getObjectType } from '../utils';

const URL_PATH_TRIM = /^\/*|\/*$/g;

export default class Controller {

  private static container = new Map();

  public static init (): void {
  }

  public static async initBeans (): Promise<void> {
    const application: Application = Application.getIns();

    Controller.container.forEach( controllerMetas => {

      let controllerPath = controllerMetas.controller.path.replace(URL_PATH_TRIM, '');
      if ( controllerPath ) {
        controllerPath = '/' + controllerPath + '/';
      }
      let controllerMiddlewares = controllerMetas.controller.middlewares;

      const controllerCls = controllerMetas.controller.target;

      Object.keys(controllerMetas.methods).forEach( method => {
        let { requestMethod, path, handler, middlewares } = controllerMetas.methods[method];

        path = controllerPath + path.replace(URL_PATH_TRIM, '');
        if (path.length < 1) {
          path = '/';
        }

        let requestHandler = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
          if (request.method === 'options') {
            return '';
          }

          return new Promise((resolve, reject) => {
            let req = new Request(request, h, resolve, reject),
                res = new Response(request, h, resolve, reject);

            if ( !controllerMetas.ins ) {
              controllerMetas.ins = new controllerCls();
              Controller.addMVCProperty(controllerMetas.ins, controllerMetas);
            }
            controllerMetas.ins.__method = handler.toLowerCase();

            let allMiddlewares = [];
            let responseMiddleware = getInnerMiddleware(controllerMetas.responseFormat.method[handler] || controllerMetas.responseFormat.clz);
            if (responseMiddleware) {
              allMiddlewares.push(responseMiddleware);
            }
            allMiddlewares = allMiddlewares.concat(controllerMiddlewares || []);
            allMiddlewares = allMiddlewares.concat(middlewares || []);

            let mlen = allMiddlewares.length, reqCallIdx = -1, resCallIdx = mlen;
            let responseCallStack = function () {
              if (resCallIdx > 0) {
                resCallIdx--;
                let middleware = Middleware.getBean(allMiddlewares[resCallIdx]);
                res.append(middleware.post(req, res, responseCallStack));
              } else if (resCallIdx <= 0) {
                res.writeAndFlush(res.getData());
              }
            };
            let requestCallStack = function () {
              reqCallIdx++;
              if (reqCallIdx >= mlen) {
                let params: Array<any> = [req, res];
                if (request.params && Object.keys(request.params).length > 0) {
                  params.unshift(request.params);
                }
                let ret = controllerMetas.ins[handler](...params);
                if (ret === null) {
                  return;
                }
                if (getObjectType(ret) === 'promise') {
                  ret.then(data => {
                    res.append(data);
                    responseCallStack();
                  }).catch(err => {
                    application.emit(AppErrorEvent.REQUEST, err);
                    reject(err);
                  });
                } else {
                  res.append(ret);
                  responseCallStack();
                }
              } else if (reqCallIdx < mlen) {
                let middleware = Middleware.getBean(allMiddlewares[reqCallIdx]);
                middleware.pre(req, res, requestCallStack);
              }
            };

            if (!responseMiddleware) {
              res.type('text/html');
            }
            try {
              requestCallStack();
            } catch (err) {
              application.emit(AppErrorEvent.REQUEST, err);
              reject(err);
            }
          });
        };
        application.route({
          method: requestMethod,
          path: path,
          handler: requestHandler
        });
      });
    });
  }

  private static addMVCProperty (controller: any, metas: any) {
    const application: Application = Application.getIns();
    let controllerPath = metas.file.split(application.controllerDir);
    let viewDir = application.viewDir;
    if (!Path.isAbsolute(viewDir)) {
      viewDir = Path.join(application.root, viewDir);
    }

    controller.__file = metas.file;
    controller.__tplDir = viewDir + Path.sep
                            + 'template' + Path.sep
                            + controllerPath.pop().replace(URL_PATH_TRIM, '').slice(0, -3).toLowerCase() + Path.sep;
    controller.__layoutDir = viewDir + Path.sep + 'layout' + Path.sep;
    controller.__tplExt = application.tplExt;
    // controller.__method = method.toLowerCase();
  }

  private static getCurrentController (): any {
    if ( !BeanFactory.currentFilePath ) {
      return null;
    }
    const application: Application = Application.getIns();
    if ( !Controller.container.get(BeanFactory.currentFilePath) ) {
      Controller.container.set(BeanFactory.currentFilePath, {
        controller: {},
        methods: {},
        responseFormat:{ clz: null, method: {} },
        file: BeanFactory.currentFilePath,
        // viewDir: application.resource + Path.sep + application.viewDir,
        ins: null
      });
    }
    return Controller.container.get(BeanFactory.currentFilePath);
  }

  public static addBean(target, { path, middlewares }): void {
    if ( !Controller.getCurrentController() ) {
      return;
    }
    const currentController = Controller.getCurrentController().controller;
    Hoek.merge(currentController, {
      target: target,
      path: path,
      middlewares: middlewares
    });
  }

  public static addMethod (target, method: string, path: string, handler: string, middleware?: any): void {
    if ( !path || !method || !Controller.getCurrentController() ) {
      return;
    }

    const currentMethods = Controller.getCurrentController().methods;
    currentMethods[handler] = {
      requestMethod: method,
      path: path,
      handler: handler,
      middlewares: middleware
    };
  }

  public static addResponseFormat(target: any, handler: string, type: string) {
    let responseFormat = Controller.getCurrentController().responseFormat;
    if (typeof target === "object") {
      responseFormat['method'][handler] = type;
    } else if (typeof target === "function") {
      responseFormat['clz'] = type;
    }
  }

  public static async destroy (): Promise<void> {
    Controller.container = null;
  }

}

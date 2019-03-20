import Controller from "../bean/controller"

function ResponseFactory(type: string , target: any, handler: string = '') {
  Controller.addResponseFormat(target, handler, type)
}

export function ResponseXML(target: any, handler?: string) {
  ResponseFactory('xml', target, handler)
}

export function ResponseJSON(target: any, handler?: string) {
  ResponseFactory('json', target, handler)
}

export function Controller(path?: string, middlewares?: any)

export function Get(path: string, middleware?: any)
export function Post(path: string, middleware?: any)
export function Put(path: string, middleware?: any)
export function Patch(path: string, middleware?: any)
export function Options(path: string, middleware?: any)

export function Entity (name?: Function | string)
export enum TableNameSeperatorType {
  underline
}

export function Task (target?: any)
export function Transactional (component?: any, type?: any)



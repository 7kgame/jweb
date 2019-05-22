export function Controller(path: string)

export function Get(path: string)
export function Post(path: string)
export function Put(path: string)
export function Patch(path: string)
export function Options(path: string)

export function Entity (name?: Function | string)

export enum TableNameSeperatorType {
  underline
}

export function Task (target?: any)
export function Transactional (component?: any, type?: any)

export function Cache(expire?: number)



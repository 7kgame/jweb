export function Controller(path?: string, middlewares?: any): void

export function Get(path: string, middleware?: any): void
export function Post(path: string, middleware?: any): void
export function Put(path: string, middleware?: any): void
export function Patch(path: string, middleware?: any): void
export function Options(path: string, middleware?: any): void

export function ResponseBody(target: any, type?: string): void

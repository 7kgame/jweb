export function Controller(path?: string, middlewares?: any)

// export function All(path: string, middleware?: any)
export function Get(path: string, middleware?: any)
export function Post(path: string, middleware?: any)
export function Put(path: string, middleware?: any)
export function Patch(path: string, middleware?: any)
export function Options(path: string, middleware?: any)

export function Autowired(component: any, propertyName?: string)

export function Service(name: any)

export function Repository(name: any)

export function Middleware(name: any)

export function ResponseJSON(target: any, handler?: string)
export function ResponseXML(target: any, handler?: string)

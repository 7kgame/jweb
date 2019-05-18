export function Validation (entityClz: Function, mode?: ValidationMode | string)
export function ValidationScene (...scenes)

export function Max(max: number, message?: string)
export function Min(min: number, message?: string)
export function Size(min: number, max?: number | string, message?: string)
export function Required(message?: Function | string | any, options?: any)

export enum ValidationMode {
  params,
  entity
}
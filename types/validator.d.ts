export function Validation (entityClz: Function, mode?: number)

export function Max(maxVal: number, message?: string)
export function Min(minVal: number, message?: string)
export function Size(min: number, max:number, message?: string)
export function Required(message?: string)
export enum ValidationMode {
  params,
  entity,
  intersect
}
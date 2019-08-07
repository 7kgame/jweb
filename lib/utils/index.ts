export * from './encoder'
export * from './linked_queue'
export * from './format'
export * from './exec'

export function msleep(n: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n)
}

export function sleep(n: number): void {
  msleep(n * 1000)
}
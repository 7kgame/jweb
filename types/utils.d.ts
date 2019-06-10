export function format (template: string, params: any, delimiter?: string): string
export function xmlEncode(ret: any): string
export function jsonEncode(ret: any): string
export function exec (cmd: string): Promise<any>
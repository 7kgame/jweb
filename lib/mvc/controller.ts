import Template from './template'

export default abstract class Controller {

  private tpl: Template

  private initTemplate (): void {
    if ( !this.tpl) {
      this.tpl = new Template()
    }
  }

  protected template (name: string, fileName: string, data?: object, options?: object): void {
    this.initTemplate()
    this.tpl.assignFile(name, fileName, data, options)
  }

  protected templateValue (name: string, value: any): void {
    this.initTemplate()
    this.tpl.assign(name, value)
  }

  protected templateValues (data: object): void {
    this.initTemplate()
    this.tpl.assigns(data)
  }

  // TODO: return Promise<string>
  protected show (fileName: string, contentKey?: string, withoutDefaultLayoutDir?: boolean): string {
    this.initTemplate()
    if ( !withoutDefaultLayoutDir ) {
      fileName = this['__layoutDir'] + fileName + '.' + this['__tplExt']
    }
    if ( !contentKey ) {
      contentKey = 'content'
    }
    if ( contentKey ) {
      let fileName1 = this['__tplDir'] + this['__method'] + '.' + this['__tplExt']
      this.template(contentKey, fileName1, null, {
        filename: this['__tplDir']
      })
    }
    return this.tpl.render(fileName, null, {
      filename: this['__layoutDir']
    })
  }

}

import * as FS from 'fs';
import * as ejs from 'ejs';
import * as Hoek from "hoek";

export default class Template {

  private static tpls = {};
  private data = {};

  public assign (name: string, value: any): void {
    this.data[name] = value;
  }

  public assigns (data: object): void {
    if (!data) {
      return;
    }
    Object.keys(data).forEach( name => {
      this.assign(name, data[name]);
    });
  }

  public assignFile (name: string, fileName: string, data?: object, options?: object): void {
    const tpl = Template.getTemplateFile(fileName);
    data = data || {};
    Hoek.merge(data, this.data);
    this.assign(name, this.render(fileName, data, options));
  }

  public render (fileName: string, data?: object, options?: object): string {
    const tpl = Template.getTemplateFile(fileName);
    let html:string = null;
    try {
      html = ejs.render(tpl, data ? data : this.data, options);
    } catch (e) {
      console.log(e);
    }
    return html;
  }

  private static getTemplateFile (fileName: string): string {
    if ( !Template.tpls[fileName] ) {
      Template.tpls[fileName] = FS.readFileSync(fileName, 'utf8');
    }

    return Template.tpls[fileName];
  }



}

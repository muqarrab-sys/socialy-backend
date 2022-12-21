import fs from 'fs';

class DirBuilder<T> {
  protected modules: Array<T> = [];
  protected FILE_POSTFIX: Array<string> = [];

  getModules(): Array<T> {
    return this.modules;
  }

  protected build(dir: string): void {
    fs.readdirSync(dir).forEach(file => {
      const filePath = `${dir}/${file}`;

      if (fs.statSync(filePath).isDirectory()) {
        this.build(filePath);
      } else if (this.FILE_POSTFIX.some(postfix => file.endsWith(postfix))) {
        this.modules.push(require(filePath).default);
      }
    });
  }
}

export default DirBuilder;

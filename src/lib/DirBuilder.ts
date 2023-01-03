import fs from 'fs';

abstract class DirBuilder<T> {
  protected modulesArray: Array<T> = [];
  protected FILE_POSTFIX: Array<string> = [];

  get modules(): Array<T> {
    return this.modulesArray;
  }

  protected build(dir: string): void {
    fs.readdirSync(dir).forEach(file => {
      const filePath = `${dir}/${file}`;

      if (fs.statSync(filePath).isDirectory()) {
        this.build(filePath);
      } else if (this.FILE_POSTFIX.some(postfix => file.endsWith(postfix))) {
        this.modulesArray.push(require(filePath).default);
      }
    });
  }
}

export default DirBuilder;

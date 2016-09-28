import FS from 'fs';
import Path from 'path';

class DefaultFileLoader {
  constructor() { }

  loadFiles(path) {
    return FS.readdirSync(path).map((file) => {
      return Path.format({dir: path, base: file});
    });
  }
}

export default DefaultFileLoader;

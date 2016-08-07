import fs from 'fs';
import path from 'path';

class DefaultFileLoader {
  constructor() { }

  loadControllerFiles(filePath) {
    return fs.readdirSync(filePath).map((file) => {
      return path.format({dir: filePath, base: file});
    });
  }
}

export default DefaultFileLoader;

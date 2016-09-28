import Path from 'path';

class FileHelper {
  static fileName(filePath) {
    return Path.basename(filePath, Path.extname(filePath));
  }
}

export default FileHelper;

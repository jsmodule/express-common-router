import path from 'path';

class FileHelper {
  static fileName(filePath) {
    return path.basename(filePath, path.extname(filePath));
  }
}

export default FileHelper;

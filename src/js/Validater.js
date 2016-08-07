class Validater {
  static isValidObj(obj) {
    return obj !== undefined && obj !== null;
  }

  static isNotEmptyObj(obj) {
    return Validater.isValidObj(obj) && Object.keys(obj).length > 0;
  }

  static isNotEmptyString(string) {
    return Validater.isValidObj(string) && string.length > 0;
  }
}

export default Validater;

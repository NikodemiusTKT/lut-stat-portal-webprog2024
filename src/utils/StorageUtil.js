class StorageUtil {
  static setItem(key, value, expirationMinutes = null) {
    const item = {
      value,
      timestamp: new Date().getTime(),
      expiration: expirationMinutes
        ? new Date().getTime() + expirationMinutes * 60000
        : null,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (item.expiration && new Date().getTime() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
export default StorageUtil;

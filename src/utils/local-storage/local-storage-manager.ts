import { LocalStorageKey } from "../enums/local-storage";

class LocalStorageManager {
  set<T>(key: LocalStorageKey, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: LocalStorageKey) {
    const lsData = localStorage.getItem(key);
    return lsData ? (JSON.parse(lsData) as T) : null;
  }

  remove(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }
}

export const localStorageManager = new LocalStorageManager();

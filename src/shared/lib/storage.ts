function getStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  } else {
    throw new Error("Local storage is not available.");
  }
}

export async function getDataByKey<T>(key: string): Promise<T | null> {
  const storage = getStorage();
  const data = storage.getItem(key);

  return data ? JSON.parse(data) : null;
}

export async function setDataByKey<T>(key: string, value: T) {
  const storage = getStorage();
  storage.setItem(key, JSON.stringify(value));
}

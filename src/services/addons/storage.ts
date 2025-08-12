export const storage = {
  async get<T>(key: string) {
    return JSON.parse(localStorage.getItem(key) || "null") as T;
  },
  async set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

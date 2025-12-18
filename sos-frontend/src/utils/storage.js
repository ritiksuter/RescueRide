const isBrowser = typeof window !== "undefined";

export const TOKEN_KEYS = {
  ACCESS: "sos_access_token",
  REFRESH: "sos_refresh_token",
};

export const storage = {
  set(key, value) {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("storage.set error:", err);
    }
  },

  get(key, fallback = null) {
    if (!isBrowser) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      console.error("storage.get error:", err);
      return fallback;
    }
  },

  remove(key) {
    if (!isBrowser) return;
    window.localStorage.removeItem(key);
  },

  clear() {
    if (!isBrowser) return;
    window.localStorage.clear();
  },
};

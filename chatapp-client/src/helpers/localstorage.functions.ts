export const saveOnLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const loadOnLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeItemOnLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};

export const clearLocalStorage = (): void => {
  localStorage.clear();
};

import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearLocalStorage,
  loadOnLocalStorage,
  removeItemOnLocalStorage,
  saveOnLocalStorage,
} from "./localstorage.functions";

describe("LocalStorage Functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    } as unknown as Storage;
  });

  it("should save a value in localStorage", () => {
    saveOnLocalStorage("testKey", "testValue");
    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", "testValue");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it("should load a value from localStorage", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValue("testValue");

    const result = loadOnLocalStorage("testKey");
    expect(localStorage.getItem).toHaveBeenCalledWith("testKey");
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(result).toBe("testValue");
  });

  it("should return null if key does not exist in localStorage", () => {
    vi.spyOn(localStorage, "getItem").mockReturnValue(null);

    const result = loadOnLocalStorage("nonExistentKey");
    expect(localStorage.getItem).toHaveBeenCalledWith("nonExistentKey");
    expect(result).toBeNull();
  });

  it("should remove an item from localStorage", () => {
    removeItemOnLocalStorage("testKey");
    expect(localStorage.removeItem).toHaveBeenCalledWith("testKey");
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });

  it("should clear localStorage", () => {
    clearLocalStorage();
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
  });
});

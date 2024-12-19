import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KEY } from "../constants/localstorage.constants";
import {
    removeItemOnLocalStorage,
    saveOnLocalStorage,
} from "./localstorage.functions";
import { rememberUser } from "./loginpage.functions";

describe("rememberUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mock("@/helpers/localstorage.functions", () => ({
      saveOnLocalStorage: vi.fn(),
      removeItemOnLocalStorage: vi.fn(),
    }));
  });

  it("should save email to localStorage when remember is true", () => {
    const email = "user@example.com";
    rememberUser(true, email);

    expect(saveOnLocalStorage).toHaveBeenCalledWith(KEY.EMAIL, email);
    expect(saveOnLocalStorage).toHaveBeenCalledTimes(1);
  });

  it("should remove email from localStorage when remember is false", () => {
    const email = "user@example.com";
    rememberUser(false, email);

    expect(removeItemOnLocalStorage).toHaveBeenCalledWith(KEY.EMAIL);
    expect(removeItemOnLocalStorage).toHaveBeenCalledTimes(1);
  });
});

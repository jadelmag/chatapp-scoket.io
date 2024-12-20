import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { KEY } from "../constants/localstorage.constants";
import { BASE_URL } from "../constants/url.constants";
import { loadOnLocalStorage } from "../helpers/localstorage.functions";
import { requestWithToken } from "./withtoken.functions";

vi.mock("@/helpers/localstorage.functions", () => ({
  loadOnLocalStorage: vi.fn(),
}));

vi.mock("@/helpers/localstorage.functions", async () => ({
  ...(await vi.importActual("@/helpers/localstorage.functions")),
  __esModule: true,
  loadOnLocalStorage: vi.fn(() => "mock-token"),
}));

describe("requestWithToken", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should make a GET request with the correct headers", async () => {
    const token = "mock-token";
    const endpoint = "test-endpoint";
    const responseData = { success: true };

    // loadOnLocalStorage.mockReturnValue(token);
    mockFetch.mockResolvedValue({
      json: async () => responseData,
    });

    const result = await requestWithToken(endpoint);

    expect(loadOnLocalStorage).toHaveBeenCalledWith(KEY.TOKEN);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      headers: {
        "x-token": token,
      },
    });
    expect(result).toEqual(responseData);
  });

  it("should make a non-GET request with the correct method and headers", async () => {
    const token = "mock-token";
    const endpoint = "test-endpoint";
    const method = "POST";
    const responseData = { success: true };

    mockFetch.mockResolvedValue({
      json: async () => responseData,
    });

    const result = await requestWithToken(endpoint, method);

    expect(loadOnLocalStorage).toHaveBeenCalledWith(KEY.TOKEN);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      method: method,
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(responseData);
  });

  it("should handle fetch errors", async () => {
    const token = "mock-token";
    const endpoint = "test-endpoint";

    mockFetch.mockRejectedValue(new Error("Fetch failed"));

    await expect(requestWithToken(endpoint)).rejects.toThrow("Fetch failed");

    expect(loadOnLocalStorage).toHaveBeenCalledWith(KEY.TOKEN);
    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      headers: {
        "x-token": token,
      },
    });
  });
});

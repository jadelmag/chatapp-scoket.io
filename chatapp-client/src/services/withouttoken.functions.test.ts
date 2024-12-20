
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BASE_URL } from "../constants/url.constants";
import { requestWithOutToken } from './witouttoken.functions';

describe("requestWithOutToken", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should make a GET request to the correct URL", async () => {
    const endpoint = "test-endpoint";
    const responseData = { success: true };

    mockFetch.mockResolvedValue({
      json: async () => responseData,
    });

    const result = await requestWithOutToken(endpoint, "", "");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`);
    expect(result).toEqual(responseData);
  });

  it("should make a POST request with email and password", async () => {
    const endpoint = "test-endpoint";
    const email = "test@example.com";
    const password = "password123";
    const method = "POST";
    const responseData = { success: true };

    mockFetch.mockResolvedValue({
      json: async () => responseData,
    });

    const result = await requestWithOutToken(endpoint, email, password, method);

    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    expect(result).toEqual(responseData);
  });

  it("should make a POST request with name, email, and password", async () => {
    const endpoint = "test-endpoint";
    const email = "test@example.com";
    const password = "password123";
    const name = "Test User";
    const method = "POST";
    const responseData = { success: true };

    mockFetch.mockResolvedValue({
      json: async () => responseData,
    });

    const result = await requestWithOutToken(endpoint, email, password, method, name);

    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    expect(result).toEqual(responseData);
  });

  it("should handle fetch errors", async () => {
    const endpoint = "test-endpoint";
    const email = "test@example.com";
    const password = "password123";

    mockFetch.mockRejectedValue(new Error("Fetch failed"));

    await expect(requestWithOutToken(endpoint, email, password, "POST"))
      .rejects.toThrow("Fetch failed");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  });
});

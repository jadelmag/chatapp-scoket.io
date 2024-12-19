import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { hourMonth } from "./date.functions";

describe("hourMonth", () => {
  it("should return a correctly formatted date in Spanish", () => {
    const dateStr = "2024-12-19T13:45:00";
    const result = hourMonth(dateStr);

    // El resultado debería ser algo como: "diciembre 19 2024, 1:45 pm"
    expect(result).toBe("diciembre 19 2024, 1:45 pm");
  });

  it("should correctly handle dates with different times", () => {
    const dateStr = "2024-11-10T08:30:00";
    const result = hourMonth(dateStr);

    // El resultado debería ser algo como: "noviembre 10 2024, 8:30 am"
    expect(result).toBe("noviembre 10 2024, 8:30 am");
  });

  it("should return the same date when already in the correct format", () => {
    const dateStr = "2024-05-05T15:00:00";
    const result = hourMonth(dateStr);

    // El resultado debería ser algo como: "mayo 5 2024, 3:00 pm"
    expect(result).toBe("mayo 5 2024, 3:00 pm");
  });
});

import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { animationToBottom } from "./scroll.functions";

describe("animationToBottom", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
    element.scrollTop = 100; 
  });

  it("should animate scrollTop to the bottom of the element", () => {
    vi.useFakeTimers();
    animationToBottom(element);

    vi.advanceTimersByTime(150);

    expect(element.scrollTop).toBeLessThan(100); 

    vi.advanceTimersByTime(150);

    expect(element.scrollTop).toBeGreaterThan(99);
  });
});

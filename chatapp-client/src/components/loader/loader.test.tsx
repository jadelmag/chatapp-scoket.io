import { Loader } from "@/components/loader/loader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Loader Component", () => {
  it("render without crashing", () => {
    render(<Loader />);

    const spinner = screen.getByLabelText("Loading Spinner");
    expect(spinner).toBeInTheDocument();
  });
});

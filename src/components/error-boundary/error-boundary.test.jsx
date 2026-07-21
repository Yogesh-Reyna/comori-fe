import { render, screen } from "@testing-library/react";

import { ErrorBoundary } from "./index";

function BrokenComponent() {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <div>Normal content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("renders fallback UI when child throws error", () => {
    const consoleError = console.error;

    console.error = vi.fn();

    render(
      <ErrorBoundary fallback={<div>Error occurred</div>}>
        <BrokenComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Error occurred")).toBeInTheDocument();

    console.error = consoleError;
  });
});

import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Header from "./index";
import { routesData } from "../../routes";

describe("Header", () => {
  it("renders current page title", async () => {
    const router = createMemoryRouter(routesData, {
      initialEntries: ["/today"],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", {
        name: "Today",
      }),
    ).toBeInTheDocument();
  });
});

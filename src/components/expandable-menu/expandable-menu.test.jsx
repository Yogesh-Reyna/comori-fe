import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ExpandableMenu from "./index";

describe("ExpandableMenu", () => {
  const menu = {
    label: "Settings",
    children: [
      {
        label: "Profile",
        path: "/profile",
      },
      {
        label: "Logout",
        action: "logout",
      },
    ],
  };

  it("renders parent menu label", () => {
    render(
      <MemoryRouter>
        <ExpandableMenu menu={menu} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("opens menu when parent button is clicked", () => {
    render(
      <MemoryRouter>
        <ExpandableMenu menu={menu} />
      </MemoryRouter>,
    );

    const button = screen.getByRole("button", {
      name: "Settings",
    });

    fireEvent.click(button);

    expect(screen.getByText("Profile")).toBeInTheDocument();

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("navigates when child link is clicked", () => {
    render(
      <MemoryRouter>
        <ExpandableMenu menu={menu} />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Settings",
      }),
    );

    const link = screen.getByText("Profile");

    expect(link).toBeInTheDocument();

    fireEvent.click(link);
  });

  it("calls onClose and closes menu on logout", () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ExpandableMenu menu={menu} onClose={onClose} />
      </MemoryRouter>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Settings",
      }),
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(onClose).toHaveBeenCalled();
  });

  it("renders icon only mode", () => {
    render(
      <MemoryRouter>
        <ExpandableMenu menu={menu} iconOnly />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });
});

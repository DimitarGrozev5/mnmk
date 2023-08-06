import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FlowingAssets_Desktop from "./flowing-assets-desktop";
import { mockZones } from "../mock-zones";

describe("FlowingAssets_Desktop", () => {
  it("should render all asset zones with a name", () => {
    render(<FlowingAssets_Desktop zones={mockZones} />);

    const heading1 = screen.getByRole("heading", { name: "test1" });
    const heading2 = screen.getByRole("heading", { name: "test2" });
    const heading3 = screen.getByRole("heading", { name: "test3" });

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });
});

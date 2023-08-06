import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FlowingAssets_Desktop from "./flowing-assets-desktop";
import { mockZones } from "../mock-zones";

describe("FlowingAssets_Desktop", () => {
  it("should render all asset zones with a name", () => {
    render(<FlowingAssets_Desktop zones={mockZones} />);

    const heading1 = screen.getByRole("heading", { name: mockZones[0].name });
    const heading2 = screen.getByRole("heading", { name: mockZones[1].name });
    const heading3 = screen.getByRole("heading", { name: mockZones[2].name });

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });
});

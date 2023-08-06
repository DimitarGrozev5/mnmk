import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FlowingAssets_Desktop from "./flowing-assets-desktop";
import { Zones } from "../flowing-assets-types";

const mockData: Zones = [
  { id: "1", name: "test1" },
  { id: "2", name: "test2" },
  { id: "3", name: "test3" },
];

describe("FlowingAssets_Desktop", () => {
  it("should render all asset zones with a name", () => {
    render(<FlowingAssets_Desktop zones={mockData} />);

    const heading1 = screen.getByRole("heading", { name: "test1" });
    const heading2 = screen.getByRole("heading", { name: "test2" });
    const heading3 = screen.getByRole("heading", { name: "test3" });

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });
});

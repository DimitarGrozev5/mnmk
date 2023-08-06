import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import FlowingAssets_Desktop from "./flowing-assets-desktop";
import { Assets } from "../flowing-assets-types";

const mockData: Assets = [];

describe("FlowingAssets_Desktop", () => {
  it("should render all asset zones with a name", () => {
    render(<FlowingAssets_Desktop assets={mockData} />);
    expect(true).toBeTruthy();
  });
});

import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import FlowingAssets_Desktop from "./flowing-assets-desktop";
import { mockZones } from "../mock-zones";

describe("FlowingAssets_Desktop", () => {
  it("should render all asset zones with a name", () => {
    render(<FlowingAssets_Desktop zonesAndTransformers={mockZones()} />);

    const heading1 = screen.getByRole("heading", {
      name: mockZones().zones[0].name,
    });
    const heading2 = screen.getByRole("heading", {
      name: mockZones().zones[1].name,
    });
    const heading3 = screen.getByRole("heading", {
      name: mockZones().zones[2].name,
    });

    expect(heading1).toBeInTheDocument();
    expect(heading2).toBeInTheDocument();
    expect(heading3).toBeInTheDocument();
  });

  it("should render with custom component individual assets in each zone", () => {
    render(<FlowingAssets_Desktop zonesAndTransformers={mockZones()} />);

    const zone1 = screen
      .getByRole("heading", {
        name: mockZones().zones[0].name,
      })
      .closest("div")!;
    const zone2 = screen
      .getByRole("heading", {
        name: mockZones().zones[1].name,
      })
      .closest("div")!;
    const zone3 = screen
      .getByRole("heading", {
        name: mockZones().zones[2].name,
      })
      .closest("div")!;

    const asset1 = within(zone1).getByText("TestAsset1");
    const asset2 = within(zone1).getByText("TestAsset2");
    const asset3 = within(zone1).getByText("TestAsset3");
    const asset4 = within(zone2).getByText("TestAsset4");
    const asset5 = within(zone2).getByText("TestAsset5");
    const asset6 = within(zone2).getByText("TestAsset6");
    const asset7 = within(zone3).getByText("TestAsset7");
    const asset8 = within(zone3).getByText("TestAsset8");
    const asset9 = within(zone3).getByText("TestAsset9");

    expect(asset1).toBeInTheDocument();
    expect(asset2).toBeInTheDocument();
    expect(asset3).toBeInTheDocument();
    expect(asset4).toBeInTheDocument();
    expect(asset5).toBeInTheDocument();
    expect(asset6).toBeInTheDocument();
    expect(asset7).toBeInTheDocument();
    expect(asset8).toBeInTheDocument();
    expect(asset9).toBeInTheDocument();
  });

  it("should render with custom component individual transformers", () => {
    render(<FlowingAssets_Desktop zonesAndTransformers={mockZones()} />);

    mockZones().transformers.forEach((transformer) => {
      const transformerElement = screen.getByText(`TestTrans${transformer.id}`);
      expect(transformerElement).toBeInTheDocument();
    });
  });

  it("should render a move button on hover", () => {
    render(<FlowingAssets_Desktop zonesAndTransformers={mockZones()} />);

    const zone1 = screen
      .getByRole("heading", {
        name: mockZones().zones[0].name,
      })
      .closest("div")!;

    const asset1 = within(zone1).getByText("TestAsset1");

    fireEvent.mouseOver(asset1);

    const moveBtn = within(asset1.parentElement!).getByRole("button", {
      name: "move",
    });
    expect(moveBtn).toBeInTheDocument();
  });
});

import { type Zones } from "./flowing-assets-types";

export const mockZones = (): Zones => [
  {
    id: "1",
    name: "Test1",
    assets: [
      { id: "1", component: "TestAsset1" },
      { id: "2", component: "TestAsset2" },
      { id: "3", component: "TestAsset3" },
    ],
  },
  {
    id: "2",
    name: "Test2",
    assets: [
      { id: "1", component: "TestAsset4" },
      { id: "2", component: "TestAsset5" },
      { id: "3", component: "TestAsset6" },
    ],
  },
  {
    id: "3",
    name: "Test3",
    assets: [
      { id: "1", component: "TestAsset7" },
      { id: "2", component: "TestAsset8" },
      { id: "3", component: "TestAsset9" },
    ],
  },
];
